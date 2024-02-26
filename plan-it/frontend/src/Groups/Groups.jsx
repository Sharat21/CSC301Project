import React, { useEffect, useState } from "react";
import axios from 'axios';

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
} from "@mui/material";
import { Cancel, Add } from "@mui/icons-material";
import { useNavigate  } from "react-router-dom";
import { useParams } from "react-router-dom";


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
  
  const { userId } = useParams(); // Extract userId from the URL
  useEffect(() => {
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

    fetchData();
  }, []);
  
  

  const navigate = useNavigate(); // Use useNavigate hook


  const handleClick = (groupId) => {
    // Handle click event, navigate to group details page
    console.log(`Clicked on group with ID: ${groupId}`);
    // Navigate to the group details page
    navigate(`/trips/${groupId}`);

  };

  const handleJoinGroup = (groupName) => {
    // Handle join group button click event
    console.log(`Joined group: ${groupName}`);
  };

  const handleLeaveGroup = (event, groupName) => {
    event.stopPropagation();

    // Handle leave group button click event
    console.log(`Left group: ${groupName}`);
  };

  return (
    <div style={{ width: "100%", position: "relative", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          
          <Typography variant="h6" sx={{ flex: 1, fontSize: "24px" }}>
            Groups
          </Typography>
          <Button color="inherit" onClick={handleJoinGroup}>
            Join Group
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
                </CardContent>
                <IconButton
                  aria-label="leave group"
                  onClick={(event) => handleLeaveGroup(event, group.id)}

                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  <Cancel />
                </IconButton>
              </Card>
          </Grid>

          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Groups;
