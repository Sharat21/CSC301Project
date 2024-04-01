// Trips.jsx

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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  CircularProgress
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";



const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  console.log(`${year}-${month}-${day}`, dateString);
  return `${year}-${month}-${day}`;
};

function formatStatus(status) {
  // Replace uppercase letter with space followed by the lowercase letter
  return status.replace(/([A-Z])/g, ' $1').trim();
}
const Trips = () => {
  const baseURL = `http://localhost:14000/api/trips`;
  const [isLoading, setIsLoading] = useState(false);
  var [tripsData, setTripsData] = useState([]);
  const { groupId, userId } = useParams(); // Extract userId from the URL
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedTrip, setEditedTrip] = useState({});
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleGoBack = () => {
    navigate(`/groups/${userId}`); // Go back to the previous page in history
  };
  const [newTrip, setNewTrip] = useState({
    id: "",
    Name: "",
    Duration: "",
    startDate: "",
    endDate: "",
    Description: "",
    Status: ""
  });
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {

      const response = await axios.get(`${baseURL}/get_trip_ids/${groupId}`);

      // var fetchedGroups = response.data.map(group => ({
      //   ...group,
      //   date: formatDate(String(group.createdOn)) // Extract date portion
      // }));
      const tripsData = [];

    // Iterate through each trip ID
    for (const tripId of response.data[0].Trips) {
      try {
        // Call your query function to retrieve trip data for the current trip ID
        const responseTrips = await axios.get(`${baseURL}/get-trip/${tripId}`);

        // Push the retrieved trip data to the tripsData array
        responseTrips.data.startDate = formatDate(String(responseTrips.data.StartDate));
        responseTrips.data.endDate = formatDate(String(responseTrips.data.EndDate));
        responseTrips.data.id = responseTrips.data._id;
        console.log(responseTrips.data)
        tripsData.push(responseTrips.data);
      } catch (error) {
        console.error(`Error retrieving trip data for trip ID ${tripId}:`, error);
        // Handle errors or skip the trip ID as needed
      }
    }
    console.log("tripData", tripsData);
    setTripsData(tripsData);

      // var fetchedTrips = response.data.map(trip => ({
      //   ...trip,
      //   startDate: formatDate(String(trip.StartDate)), // Extract date portion
      //   endDate: formatDate(String(trip.EndDate)) // Extract date portion
      // }));
      
      // console.log('User data:', fetchedTrips);
      } catch (error) {
        //setError(error.message);
        console.log('Error', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleEditDetails = (event, trip) => {
    event.stopPropagation();

    setEditedTrip({ ...trip }); // Initialize editedTrip with the data of the selected trip
    // setEditedTrip(prevState => ({ ...prevState, id: trip.id }));

    setOpenEditDialog(true);
  };

  const handleSaveChanges = async () => {
    // Update the corresponding trip in tripsData
    const { id, Name, Duration, startDate, endDate, Description, Status } = editedTrip;
    console.log("update data", id);

    var tripId = id;
    try {
      const response = await axios.post(`${baseURL}/update-trip`, { Name, Duration, startDate, endDate, Description, Status, tripId });
      const user = response.data;
      console.log("update data", user);
      const updatedTripsData = tripsData.map((trip) =>
      trip.id === editedTrip.id ? { ...editedTrip } : trip
    );
  
      // Update the state with the new data
      console.log("updatedData", updatedTripsData);
      setTripsData(updatedTripsData);
      
    
  } catch (error) {
      if (error.response && error.response.status === 400) {
          alert(error.response.data.error);
      } else {
          console.error('Error registering:', error);
      }
  }
    // Close the dialog
    setOpenEditDialog(false);
  };

  const handleClickOnCard = (e, trip, groupId) => {
    // Check if any button inside the card was clicked
    if (e.target.tagName === "BUTTON" || e.target.tagName === "ICONBUTTON") {
        // If a button was clicked, prevent further propagation of the click event
        e.stopPropagation();
    } else {
        // Handle the click event on the card
        navigate(`/ideas/${groupId}/${trip.id}/${userId}`);
    }
};

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
  };

  const handleCardHover = (trip) => {
    setSelectedTrip(trip);
  };

  const handleCreateTrip = () => {
    setOpenCreateDialog(true);
  };

  const handleCreateDialogClose = () => {
    setOpenCreateDialog(false);
  };

  const handleCreateDialogSave = async () => {
    // Add the new trip to tripsData
    var tripId;
    const { Name, Duration, startDate, endDate, Description, Status } = newTrip;
    // const { groupId } = useParams(); // Extract userId from the URL
    console.log("groupid", groupId);
    try {
      const response = await axios.post(`${baseURL}/add-trip`, { Name, Duration, startDate, endDate, Description, Status, groupId });
      const user = response.data;
      console.log('User data:', user);
      tripId = user.tripId;
      // Add the new trip to tripsData with the generated id
      const newTripWithId = { ...newTrip, id: tripId };
      tripsData.push(newTripWithId);
    
  } catch (error) {
      if (error.response && error.response.status === 400) {
          alert(error.response.data.error);
      } else {
          console.error('Error registering:', error);
      }
  }

    

    // Clear the new trip state
    setNewTrip({
      id: "",
      Name: "",
      Duration: "",
      startDate: "",
      endDate: "",
      Description: "",
      Status: "",
    });

    // Close the dialog
    setOpenCreateDialog(false);
  };
  const handleDeleteTrip = async (event, tripId) => {
    event.stopPropagation();
    try {
        // Remove the trip with the specified ID
        await axios.get(`${baseURL}/delete-trip/${tripId}/${groupId}`);

        // Update tripsData by filtering out the deleted trip
        const updatedTripsData = tripsData.filter(trip => trip.id !== tripId);
        setTripsData(updatedTripsData);
    } catch (error) {
        console.error('Error deleting trip:', error);
        // Handle error
    }
};

return (
  <div style={{ width: '100%' }}>
    <Header userId={userId}/>
    <AppBar position="static" sx={{ width: '100%' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="go back"
          onClick={handleGoBack}
          sx={{ mr: 2 }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ fontSize: "24px" }}>
          My Trips
        </Typography>
      </Toolbar>
    </AppBar>

    {isLoading ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    ) : (
      <Container disableGutters maxWidth={false} sx={{ width: '100%', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {tripsData.map((trip, index) => (
          <Card
            key={index}
            sx={{
              width: '100%',
              marginBottom: 2,
              cursor: 'pointer',
              position: "relative",
              "&:hover": {
                backgroundColor: '#f0f0f0',
              },
              border: selectedTrip && selectedTrip.Name === trip.Name ? '2px solid #1976D2' : '1px solid #ddd',
            }}
            onMouseEnter={() => handleCardHover(trip)}
            onMouseLeave={() => handleCardHover(null)}
            onClick={(e) => handleClickOnCard(e, trip, groupId)}
          >
            <CardContent>
              <Typography variant="h6">{trip.Name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Duration: {trip.Duration}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start Date: {trip.startDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                End Date: {trip.endDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {trip.Description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {formatStatus(trip.Status)}
              </Typography>

              <Button variant="outlined" color="primary" onClick={(event) => handleEditDetails(event, trip)} sx={{ marginTop: 2, zIndex: 1000 }}>
                Edit Details
              </Button>

              <IconButton
                color="error"
                aria-label="delete trip"
                onClick={(event) => handleDeleteTrip(event, trip.id)}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Container>
    )}

    <Grid
      container
      justifyContent="flex-end"
      alignItems="flex-end"
      sx={{
        position: "fixed",
        bottom: "16px",
        right: "16px",
        zIndex: 999,
        marginRight: "20px",
        marginBottom: "20px",
      }}
    >
      <IconButton
        color="primary"
        aria-label="create trip"
        sx={{
          width: '64px',
          height: '64px',
        }}
        onClick={handleCreateTrip}
      >
        <AddIcon sx={{ fontSize: '36px' }} />
      </IconButton>
    </Grid>

    <Dialog open={openEditDialog} onClose={handleCloseDialog} sx={{ zIndex: 1000 }}>
      <DialogTitle>Edit Details</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={editedTrip.Name || ''}
          onChange={(e) => setEditedTrip({ ...editedTrip, Name: e.target.value })}
          fullWidth
          margin="normal"
        />
        {/* Rest of the form fields */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSaveChanges} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>

    <Dialog open={openCreateDialog} onClose={handleCreateDialogClose} sx={{ zIndex: 1000 }}>
      <DialogTitle>Create Trip</DialogTitle>
      <DialogContent>
        {/* Form fields for creating a new trip */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreateDialogClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleCreateDialogSave} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

};

export default Trips;
