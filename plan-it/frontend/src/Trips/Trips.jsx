// Trips.jsx

import React, { useState } from "react";
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
} from "@mui/material";
let tripsData = [
  {
    name: "Trip 1",
    duration: "3 days",
    startDate: "2024-02-10",
    endDate: "2024-02-13",
    description: "A wonderful trip to explore new places.",
    status: "Planned",
  },
  {
    name: "Trip 2",
    duration: "5 days",
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    description: "An adventurous journey to the mountains.",
    status: "In Progress",
  },
  {
    name: "Trip 3",
    duration: "7 days",
    startDate: "2024-04-22",
    endDate: "2024-04-28",
    description: "A relaxing beach vacation.",
    status: "Completed",
  },
  {
    name: "Trip 4",
    duration: "4 days",
    startDate: "2024-06-10",
    endDate: "2024-06-14",
    description: "Exploring historical landmarks and museums.",
    status: "Planned",
  },
  {
    name: "Trip 5",
    duration: "6 days",
    startDate: "2024-08-01",
    endDate: "2024-08-06",
    description: "Hiking in the mountains and camping.",
    status: "In Progress",
  },
  {
    name: "Trip 6",
    duration: "4 days",
    startDate: "2024-09-10",
    endDate: "2024-09-14",
    description: "Cultural exploration in a new city.",
    status: "Planned",
  },
];

const Trips = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedTrip, setEditedTrip] = useState({});
  const [selectedTrip, setSelectedTrip] = useState(null);

  const handleEditDetails = (trip) => {
    setEditedTrip(trip);
    setOpenEditDialog(true);
  };

  const handleSaveChanges = () => {
    // Update the corresponding trip in tripsData
    const updatedTripsData = tripsData.map((trip) =>
      trip.name === editedTrip.name ? { ...trip, ...editedTrip } : trip
    );

    // Update the state with the new data
    tripsData = updatedTripsData;

    // Close the dialog
    setOpenEditDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
  };

  const handleCardHover = (trip) => {
    setSelectedTrip(trip);
  };

  return (
    <div style={{ width: '100%' }}>
      <AppBar position="static" sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontSize: "24px" }}>
            My Trips
          </Typography>
        </Toolbar>
      </AppBar>

      <Container disableGutters maxWidth={false} sx={{ width: '100%', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {tripsData.map((trip, index) => (
          <Card
            key={index}
            sx={{
              width: '100%',
              marginBottom: 2,
              cursor: 'pointer',
              "&:hover": {
                backgroundColor: '#f0f0f0',
              },
              border: selectedTrip && selectedTrip.name === trip.name ? '2px solid #1976D2' : '1px solid #ddd',
            }}
            onMouseEnter={() => handleCardHover(trip)}
            onMouseLeave={() => handleCardHover(null)}
            onClick={() => handleEditDetails(trip)}
          >
            <CardContent>
              <Typography variant="h6">{trip.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Duration: {trip.duration}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start Date: {trip.startDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                End Date: {trip.endDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {trip.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {trip.status}
              </Typography>

              {/* Edit Details Button */}
              <Button variant="outlined" color="primary" sx={{ marginTop: 2 }}>
                Edit Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </Container>

      {/* Edit Details Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editedTrip.name || ''}
            onChange={(e) => setEditedTrip({ ...editedTrip, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Duration"
            value={editedTrip.duration || ''}
            onChange={(e) => setEditedTrip({ ...editedTrip, duration: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Start Date"
            type="date"
            value={editedTrip.startDate || ''}
            onChange={(e) => setEditedTrip({ ...editedTrip, startDate: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="End Date"
            type="date"
            value={editedTrip.endDate || ''}
            onChange={(e) => setEditedTrip({ ...editedTrip, endDate: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            value={editedTrip.description || ''}
            onChange={(e) => setEditedTrip({ ...editedTrip, description: e.target.value })}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={editedTrip.status || ''}
              onChange={(e) => setEditedTrip({ ...editedTrip, status: e.target.value })}
            >
              <MenuItem value="Planned">Planned</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
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
    </div>
  );
};

export default Trips;
