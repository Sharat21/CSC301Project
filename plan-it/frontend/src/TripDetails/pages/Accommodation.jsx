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
  DialogActions,
  CircularProgress
} from '@mui/material';
import NavBar from './components/NavBar';
import TripDetailsHeader from './components/TripDetailsHeader';
import { useParams } from 'react-router-dom';

const Accommodation = () => {
  const { tripId, userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmedAccommodation, setConfirmedAccommodation] = useState([]);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedAccommodation, setEditedAccommodation] = useState({});
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [accommodationData, setAccommodationData] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [accommodationToDelete, setAccommodationToDelete] = useState(null);
  const baseURL = `http://localhost:14000/api/ideas`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${baseURL}/confirmed-ideas-trip/Accommodation/${tripId}`);
        setConfirmedAccommodation(response.data);
        setAccommodationData(response.data);
        console.log('Confirmed Accommodation: ', response.data);
      } catch (error) {
        setError(error.message);
        console.log('Could not retrieve confirmed accomodation.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEditDetails = (Accommodation) => {
    setEditedAccommodation(Accommodation);
    setOpenEditDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
  }

  const handleCloseDeleteDialog = () => {
    setOpenConfirmDialog(false);
  }

  const handleCardHover = (Accommodation) => {
    setSelectedAccommodation(Accommodation);
  }

  const handleDeleteRequest = (accommodationID) => {
    setAccommodationToDelete(accommodationID);
    setOpenConfirmDialog(true); 
  };

  const handleDeleteAccommodation = async (accommodationID) => {
    try {
      const response = await axios.delete(`${baseURL}/delete-idea/${accommodationID}`);
      console.log(response.data.message);

      setAccommodationToDelete(null);
      setOpenEditDialog(false);
      setOpenConfirmDialog(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting accommodation: ", error.message);
    }
  };

  const DeleteDialog = ({ open, onClose }) => {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '30px' }}>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this accommodation?
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
            <Button onClick={() => handleDeleteAccommodation(accommodationToDelete)} color="error" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    )
  }

  const AccommodationDialog = ({ open, onClose, accommodation }) => {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '30px' }}>{accommodation.Name}</DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="body1"><strong>Proposed by:</strong> {accommodation.Proposed_by}</Typography>
          <Typography variant="body1"><strong>Trip:</strong> {accommodation.Trip}</Typography>
          <Typography 
            variant="body1"><strong>Link:</strong> {accommodation.link ?
            <a href={accommodation.link} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>{accommodation.link}</a> : "No link available" }
          </Typography>
          <Typography variant="body1"><strong>Price:</strong> {accommodation.price}</Typography>
          <Typography 
            variant="body1"><strong>Description:</strong> {accommodation.Description ? accommodation.Description : "No description available"}
          </Typography>
        </DialogContent>
        <DialogContent>
          {/* To add more space at the bottom */}
          <div style={{ height: '10px' }}></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDeleteRequest(accommodation._id)} color="error">Delete Accommodation</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  console.log('Accommodation component rendered');

  return (
    <div style={{ width: '100%' }}>
      <TripDetailsHeader userId={userId}/>
      <NavBar/>
      <AppBar position="static" sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontSize: '24px' }}>
            Accommodation
          </Typography>
        </Toolbar>
      </AppBar>
  
      {isLoading ? (
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Container>
      ) : (
        <Container
          disableGutters
          maxWidth={false}
          sx={{ width: '100%', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
        >
          {accommodationData.map((Accommodation, index) => (
            <Card
              key={index}
              sx={{
                width: '100%',
                marginBottom: 2,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
                border: selectedAccommodation && selectedAccommodation.id === Accommodation.id ? '2px solid #1976D2' : '1px solid #ddd',
              }}
              onMouseEnter={() => handleCardHover(Accommodation)}
              onMouseLeave={() => handleCardHover(null)}
              onClick={() => handleEditDetails(Accommodation)}
            >
              <CardContent>
                <Typography variant="h6">{Accommodation.Name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {Accommodation.Type}
                </Typography>
                {/* Add more details as needed */}
                <Button variant="outlined" color="primary" sx={{ marginTop: 2 }}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </Container>
      )}
  
      <AccommodationDialog open={openEditDialog} onClose={handleCloseDialog} accommodation={editedAccommodation}></AccommodationDialog>
      <DeleteDialog open={openConfirmDialog} onClose={handleCloseDeleteDialog} accommodation={editedAccommodation} />
    </div>
  );
  
};

export default Accommodation;