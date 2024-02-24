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
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);
  const baseURL = `http://localhost:14000/api/ideas`;

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

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
  }

  const handleCloseDeleteDialog = () => {
    setOpenConfirmDialog(false);
  }

  const handleCardHover = (activity) => {
    setSelectedActivity(activity);
  }

  const handleDeleteRequest = (activityID) => {
    setActivityToDelete(activityID);
    setOpenConfirmDialog(true); 
  };

  const handleDeleteActivity = async (activityID) => {
    try {
      const response = await axios.delete(`${baseURL}/delete-idea/${activityID}`);
      console.log(response.data.message);

      setActivityToDelete(null);
      setOpenEditDialog(false);
      setOpenConfirmDialog(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting activity: ", error.message);
    }
  };

  const DeleteDialog = ({ open, onClose }) => {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '30px' }}>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this activity?
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
            <Button onClick={() => handleDeleteActivity(activityToDelete)} color="error" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    )
  }

  const ActivityDialog = ({ open, onClose, activity }) => {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '30px' }}>{activity.Name}</DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="body1"><strong>Proposed by:</strong> {activity.Proposed_by}</Typography>
          <Typography variant="body1"><strong>Trip:</strong> {activity.Trip}</Typography>
          <Typography 
            variant="body1"><strong>Link:</strong> {activity.link ?
            <a href={activity.link} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>{activity.link}</a> : "No link available" }
          </Typography>
          <Typography variant="body1"><strong>Price:</strong> {activity.price}</Typography>
          <Typography 
            variant="body1"><strong>Description:</strong> {activity.Description ? activity.Description : "No description available"}
          </Typography>
        </DialogContent>
        <DialogContent>
          {/* To add more space at the bottom */}
          <div style={{ height: '10px' }}></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDeleteRequest(activity._id)} color="error">Delete Activity</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

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
              <Button variant="outlined" color="primary" sx={{ marginTop: 2 }}>
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </Container>

      <ActivityDialog open={openEditDialog} onClose={handleCloseDialog} activity={editedActivity} />

      <DeleteDialog open={openConfirmDialog} onClose={handleCloseDeleteDialog} activity={editedActivity} />

    </div>
  );
};

export default Activities;