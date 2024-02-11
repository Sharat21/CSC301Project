import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

const Activities = () => {
  const [confirmedActivities, setConfirmedActivities] = useState([]);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedActivity, setEditedActivity] = useState({});
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activitiesData, setActivitiesData] = useState([]);
  const baseURL = `http://localhost:5100/api/ideas`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/confirmed-ideas/Activity`);
        setConfirmedActivities(response.data);
        setActivitiesData(response.data);
        console.log('Confirmed Activities: ', response.data);
      } catch (error) {
        setError(error.message);
        console.log('Could not retrieve confirmed activities.');
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEditDetails = (activity) => {
    setEditedActivity(activity);
    setOpenEditDialog(true);
  }

  // const handleSaveChanges = () => {
  //   // const updatedActivitiesData = activitiesData.map((activity) =>
  //   //   activity.name === editedActivity.name ? { ...activity, ...editedActivity } : activity
  //   // );
  //   // activitiesData = updatedActivitiesData;
  //   setOpenEditDialog(false);
  // };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
  }

  const handleCardHover = (activity) => {
    setSelectedActivity(activity);
  }

  return (
    <div style={{ width: '100%' }}>
      <AppBar position="static" sx={{ width: '100%', marginLeft: '200px' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontSize: '24px' }}>
            Activities
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        disableGutters
        maxWidth={false}
        sx={{ width: '100%', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '200px' }}
      >
        {activitiesData.map((activity, index) => (
          <Card
            key={index}
            sx={{
              width: '100%',
              marginBottom: 2,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
              border: selectedActivity && selectedActivity.id === activity.id ? '2px solid #1976D2' : '1px solid #ddd',
            }}
            onMouseEnter={() => handleCardHover(activity)}
            onMouseLeave={() => handleCardHover(null)}
            onClick={() => handleEditDetails(activity)}
          >
            <CardContent>
              <Typography variant="h6">{activity.Name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {activity.Type}
              </Typography>
              {/* Add more details as needed */}
              <Button variant="outlined" color="primary" sx={{ marginTop: 2 }}>
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </Container>

      <Dialog open={openEditDialog} onClose={handleCloseDialog}>
      <DialogTitle>Activity Details</DialogTitle>
        <DialogContent>
          {Object.entries(editedActivity).map(([key, value]) => (
            <div key={key}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>{key}:</Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>{value}</Typography>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Activities;