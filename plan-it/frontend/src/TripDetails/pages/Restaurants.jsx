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

const Restaurants = () => {
  const [confirmedRestaurants, setConfirmedRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedRestaurants, setEditedRestaurants] = useState({});
  const [selectedRestaurants, setSelectedRestaurants] = useState(null);
  const [RestaurantsData, setRestaurantsData] = useState([]);
  const baseURL = `http://localhost:5100/api/ideas`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/confirmed-ideas/Restaurant`);
        setConfirmedRestaurants(response.data);
        setRestaurantsData(response.data);
        console.log('Confirmed Restaurants: ', response.data);
      } catch (error) {
        setError(error.message);
        console.log('Could not retrieve confirmed restaurants.');
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEditDetails = (Restaurants) => {
    setEditedRestaurants(Restaurants);
    setOpenEditDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
  }

  const handleCardHover = (Restaurants) => {
    setSelectedRestaurants(Restaurants);
  }

  return (
    <div style={{ width: '100%' }}>
      <AppBar position="static" sx={{ width: '100%', marginLeft: '200px' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontSize: '24px' }}>
            Restaurants
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        disableGutters
        maxWidth={false}
        sx={{ width: '100%', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '200px' }}
      >
        {RestaurantsData.map((Restaurants, index) => (
          <Card
            key={index}
            sx={{
              width: '100%',
              marginBottom: 2,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
              border: selectedRestaurants && selectedRestaurants.id === Restaurants.id ? '2px solid #1976D2' : '1px solid #ddd',
            }}
            onMouseEnter={() => handleCardHover(Restaurants)}
            onMouseLeave={() => handleCardHover(null)}
            onClick={() => handleEditDetails(Restaurants)}
          >
            <CardContent>
              <Typography variant="h6">{Restaurants.Name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {Restaurants.Type}
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
      <DialogTitle>Restaurants Details</DialogTitle>
        <DialogContent>
          {Object.entries(editedRestaurants).map(([key, value]) => (
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

export default Restaurants;