import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from './../components/Header';

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Tooltip,
} from "@mui/material";

import { Cancel, Add, FileCopy } from "@mui/icons-material";
import { useNavigate  } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";


// const groupsData = [
//   {
//     id: 1,
//     name: "Family",
//     members: ["John", "Jane", "Alice"],
//     date: "2023-05-15",
//   },
//   {
//     id: 2,
//     name: "Friends",
//     members: ["Tom", "Emily", "Mike"],
//     date: "2023-06-20",
//   },
//   // Add more group data as needed
// ];
const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  console.log(`${year}-${month}-${day}`, dateString);
  return `${year}-${month}-${day}`;
};

const Groups = () => {
  const baseURL = `http://localhost:14000/api/groups`;
  const [groupsData, setGroupsData] = useState([]);

  const [copiedGroupId, setCopiedGroupId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [joinGroupDialogOpen, setJoinGroupDialogOpen] = useState(false);
  const [groupIdToJoin, setGroupIdToJoin] = useState("");
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [groupNameToLeave, setGroupNameToLeave] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page in history
  };
  const fetchData = async () => {
    try {
      console.log('User data:', userId);

    const response = await axios.get(`${baseURL}/all-groups/${userId}`);

    // var fetchedGroups = response.data.map(group => ({
    //   ...group,
    //   date: formatDate(String(group.createdOn)) // Extract date portion
    // }));

    var fetchedGroups = await Promise.all(response.data.map(async (group) => {
      const members = await Promise.all(group.Users.map(async (userId) => {
        // Call the database function to retrieve user data based on the user ID
        try {
          const userDataResponse = await axios.get(`${baseURL}/findUser/${userId}`);
          return userDataResponse.data.Firstname + " " + userDataResponse.data.Lastname; // Assuming user data contains a 'name' field
        } catch (error) {
          console.error(`Error fetching user data for user ID ${userId}:`, error.message);
          return null; // Return null if user data cannot be fetched
        }
      }));
      return { ...group, members,
        date: formatDate(String(group.createdOn)) // Extract date portion
      }; // Return the group object with updated members array
    }));
    setGroupsData(fetchedGroups);
    console.log('User data:', fetchedGroups);
    } catch (error) {
      //setError(error.message);
      console.log('Error', error.message);
    }
  }


  const { userId } = useParams(); // Extract userId from the URL
  useEffect(() => {
    

    fetchData();
  }, []);




  const handleClick = (groupId) => {
    // Handle click event, navigate to group details page
    console.log(`Clicked on group with ID: ${groupId}`);
    // Navigate to the group details page
    navigate(`/trips/${groupId}/${userId}`);
  };

  const handleJoinGroup = () => {
    setJoinGroupDialogOpen(true);
  };

  const handleJoinGroupConfirm = async () => {
    // Logic to join the group using the provided group ID
    console.log("Joining group with ID:", groupIdToJoin);
    try {
      const response = await axios.post(`${baseURL}/join-group`, {
        groupId: groupIdToJoin,
        userId: userId,
      });
      console.log('New group created:', response.data);
      // You can fetch updated group data here if needed
      setOpenDialog(false);
      setNewGroupName("");
      await fetchData();
    } catch (error) {
      console.error('Error creating new group:', error.message);
      // Handle error
    }
    setJoinGroupDialogOpen(false);
    setGroupIdToJoin(""); // Clear the input field
  };

  const handleAddGroup = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewGroupName("");
  };

    const handleCreateGroup = async () => {
    try {
      const response = await axios.post(`${baseURL}/create-group`, {
        name: newGroupName,
        userId: userId,
      });
      console.log('New group created:', response.data);
      // You can fetch updated group data here if needed
      setOpenDialog(false);
      setNewGroupName("");
      await fetchData();

    } catch (error) {
      console.error('Error creating new group:', error.message);
      // Handle error
    }
  };

  const handleLeaveGroup = async(event, groupId) => {
    event.stopPropagation();
    setOpenConfirmationDialog(true); // Open the confirmation dialog
    setGroupNameToLeave(groupId);
  };

  const handleConfirmLeave = async () => {
    try {
      const response = await axios.post(`${baseURL}/leave-group`, {
        groupId: groupNameToLeave,
        userId: userId,
      });
      // You can fetch updated group data here if needed
      setOpenConfirmationDialog(false);
      setGroupNameToLeave("");
      await fetchData();
    } catch (error) {
      console.error('Error creating new group:', error.message);
      // Handle error
    }
  };
  
  const handleCopyGroupId = (groupId) => {
    setCopiedGroupId(groupId);
    setTimeout(() => {
      setCopiedGroupId(null);
    }, 3000);
    navigator.clipboard.writeText(groupId);
  };

  return (

    <div style={{ width: "100%", position: "relative", minHeight: "100vh" }}>
      <Header userId={userId}/>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>

        <IconButton
          edge="start"
          color="inherit"
          aria-label="go back"
          onClick={handleGoBack}
          sx={{ mr: 2 }} // Add margin to the right
        >
          <ArrowBack />
        </IconButton>
          <Typography variant="h6" sx={{ flex: 1, fontSize: "24px" }}>
            Groups
          </Typography>
          <Button color="inherit" onClick={handleJoinGroup}>
            Join Group
          </Button>
          <Button color="inherit" onClick={handleAddGroup}>
            Create Group
          </Button>
        </Toolbar>
      </AppBar>

      <Container disableGutters maxWidth={false}>
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ marginTop: 4 }}
        >
          {groupsData.map((group, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3} sx={{ padding: 0 }}>
              <Card
                sx={{ width: "100%", height: "100%", position: "relative" }}

                onClick={() => handleClick(group._id)}
              >
                <CardContent>
                  <Typography variant="h6">{group.Name}</Typography>
                  <Typography variant="body1">
                    Members: {group.members.join(", ")}
                  </Typography>
                  <Typography variant="body2">Date Created: {group.date}</Typography>
                  <Typography variant="body3">Group ID: {group._id}</Typography>
                  <Button variant="outlined" onClick={(e) => { e.stopPropagation(); handleCopyGroupId(group._id); }}>
                  {copiedGroupId === group._id ? 'Copied' : 'Copy ID'}
                  </Button>
                </CardContent>
                <IconButton
                  aria-label="leave group"
                  onClick={(event) => handleLeaveGroup(event, group._id)}

                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  <Cancel />
                </IconButton>
              </Card>
            </Grid>

          ))}
        </Grid>
      </Container>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="group-name"
            label="Group Name"
            type="text"
            fullWidth
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleCreateGroup}>Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={joinGroupDialogOpen} onClose={() => setJoinGroupDialogOpen(false)}>
        <DialogTitle>Join Group</DialogTitle>
        <DialogContent>
          <TextField
            label="Group ID"
            variant="outlined"
            fullWidth
            value={groupIdToJoin}
            onChange={(e) => setGroupIdToJoin(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setJoinGroupDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleJoinGroupConfirm} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmationDialog} onClose={() => setOpenConfirmationDialog(false)}
       >
      <DialogTitle>Leave Group Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to leave the group?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenConfirmationDialog(false) } color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmLeave} color="primary">
          Leave Group
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
};

export default Groups;
