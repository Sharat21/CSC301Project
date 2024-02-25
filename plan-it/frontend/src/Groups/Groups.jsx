import React from "react";
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

const groupsData = [
  {
    id: 1,
    name: "Family",
    members: ["John", "Jane", "Alice"],
    date: "2023-05-15",
  },
  {
    id: 2,
    name: "Friends",
    members: ["Tom", "Emily", "Mike"],
    date: "2023-06-20",
  },
  // Add more group data as needed
];

const Groups = () => {
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
                
                onClick={() => handleClick(group.id)}
              >
                <CardContent>
                  <Typography variant="h6">{group.name}</Typography>
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
