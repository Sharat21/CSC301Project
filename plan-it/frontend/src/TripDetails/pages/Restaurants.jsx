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
import NavBar from './components/NavBar';

const Restaurants = () => {
  const [confirmedRestaurants, setConfirmedRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedRestaurants, setEditedRestaurants] = useState({});
  const [selectedRestaurants, setSelectedRestaurants] = useState(null);
  const [RestaurantsData, setRestaurantsData] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);
  const baseURL = `http://localhost:14000/api/ideas`;

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

  const handleCloseDeleteDialog = () => {
    setOpenConfirmDialog(false);
  }

  const handleCardHover = (Restaurants) => {
    setSelectedRestaurants(Restaurants);
  }

  const handleDeleteRequest = (restaurantID) => {
    setRestaurantToDelete(restaurantID);
    setOpenConfirmDialog(true); 
  };

  const handleDeleteRestaurant = async (restaurantID) => {
    try {
      const response = await axios.delete(`${baseURL}/delete-idea/${restaurantID}`);
      console.log(response.data.message);

      setRestaurantToDelete(null);
      setOpenEditDialog(false);
      setOpenConfirmDialog(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting restaurant: ", error.message);
    }
  };

  const DeleteDialog = ({ open, onClose }) => {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '30px' }}>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this restaurant?
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
            <Button onClick={() => handleDeleteRestaurant(restaurantToDelete)} color="error" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    )
  }

  const RestaurantDialog = ({ open, onClose, restaurant }) => {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '30px' }}>{restaurant.Name}</DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="body1"><strong>Proposed by:</strong> {restaurant.Proposed_by}</Typography>
          <Typography variant="body1"><strong>Trip:</strong> {restaurant.Trip}</Typography>
          <Typography 
            variant="body1"><strong>Link:</strong> {restaurant.link ?
            <a href={restaurant.link} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>{restaurant.link}</a> : "No link available" }
          </Typography>
          <Typography variant="body1"><strong>Price:</strong> {restaurant.price}</Typography>
          <Typography 
            variant="body1"><strong>Description:</strong> {restaurant.Description ? restaurant.Description : "No description available"}
          </Typography>
        </DialogContent>
        <DialogContent>
          {/* To add more space at the bottom */}
          <div style={{ height: '10px' }}></div>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => handleDeleteRequest(restaurant._id)} color="error">Delete Restaurant</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <NavBar/>
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

      <RestaurantDialog open={openEditDialog} onClose={handleCloseDialog} restaurant={editedRestaurants}></RestaurantDialog>

      <DeleteDialog open={openConfirmDialog} onClose={handleCloseDeleteDialog} restaurant={editedRestaurants} />

    </div>
  );
};

export default Restaurants;