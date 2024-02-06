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

const Accommodation = () => {
  const [confirmedAccommodation, setConfirmedAccommodation] = useState([]);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedAccommodation, setEditedAccommodation] = useState({});
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [accommodationData, setAccommodationData] = useState([]);
  const baseURL = `http://localhost:5100/api/ideas`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/confirmed-ideas/Accommodation`);
        setConfirmedAccommodation(response.data);
        setAccommodationData(response.data);
        console.log('Confirmed Accommodation: ', response.data);
      } catch (error) {
        setError(error.message);
        console.log('Could not retrieve confirmed accomodation.');
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

  const handleCardHover = (Accommodation) => {
    setSelectedAccommodation(Accommodation);
  }

  return (
    <div style={{ width: '100%' }}>
      <AppBar position="static" sx={{ width: '100%', marginLeft: '200px' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontSize: '24px' }}>
            Accommodation
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        disableGutters
        maxWidth={false}
        sx={{ width: '100%', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '200px' }}
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

      <Dialog open={openEditDialog} onClose={handleCloseDialog}>
      <DialogTitle>Accommodation Details</DialogTitle>
        <DialogContent>
          {Object.entries(editedAccommodation).map(([key, value]) => (
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

export default Accommodation;