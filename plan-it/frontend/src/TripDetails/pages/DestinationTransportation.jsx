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

const DestinationTransportation = () => {
  const [error, setError] = useState(null);
  const [confirmedDestination, setConfirmedDestination] = useState(null);
  const [openDestinationDialog, setOpenDestinationDialog] = useState(false);
  const [editedDestination, setEditedDestination] = useState({});
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [DestinationData, setDestinationData] = useState([]);

  const [confirmedTransportation, setConfirmedTransportation] = useState(null);
  const [openTransportationDialog, setOpenTransportationDialog] = useState(false);
  const [editedTransportation, setEditedTransportation] = useState({});
  const [selectedTransportation, setSelectedTransportation] = useState(null);
  const [transportationData, setTransportationData] = useState([]);

  const baseURL = `http://localhost:5100/api/ideas`;

  useEffect(() => {
    const fetchDestinationData = async () => {
      try {
        const response = await axios.get(`${baseURL}/confirmed-ideas/Destination`);
        setConfirmedDestination(response.data);
        setDestinationData(response.data);
        console.log('Confirmed Destination: ', response.data);
      } catch (error) {
        setError(error.message);
        console.log('Could not retrieve confirmed Destination.');
      }
    }

    fetchDestinationData();
  }, []);

  useEffect(() => {
    const fetchTransportationData = async () => {
      try {
        const response = await axios.get(`${baseURL}/confirmed-ideas/Transportation`);
        setConfirmedTransportation(response.data);
        setTransportationData(response.data);
        console.log('Confirmed Transportation: ', response.data);
      } catch (error) {
        setError(error.message);
        console.log('Could not retrieve confirmed Transportation.');
      }
    }

    fetchTransportationData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEditDestinationDetails = (Destination) => {
    setEditedDestination(Destination);
    setOpenDestinationDialog(true);
  }

  const handleEditTransportationDetails = (Transportation) => {
    setEditedTransportation(Transportation);
    setOpenTransportationDialog(true);
  }

  const handleCloseDestinationDialog = () => {
    setOpenDestinationDialog(false);
  }

  const handleCloseTransportationDialog = () => {
    setOpenTransportationDialog(false);
  }

  const handleCardTransportationHover = (Destination) => {
    setSelectedDestination(Destination);
  }

  const handleCardDestinationHover = (Destination) => {
    setSelectedDestination(Destination);
  }

  return (
    <div style={{ width: '100%' }}>
      <AppBar position="static" sx={{ width: '100%', marginLeft: '200px' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontSize: '24px' }}>
            Destination
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        disableGutters
        maxWidth={false}
        sx={{ width: '100%', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '200px' }}
      >
        {DestinationData.map((Destination, index) => (
          <Card
            key={index}
            sx={{
              width: '100%',
              marginBottom: 2,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
              border: selectedDestination && selectedDestination.id === Destination.id ? '2px solid #1976D2' : '1px solid #ddd',
            }}
            onMouseEnter={() => handleCardDestinationHover(Destination)}
            onMouseLeave={() => handleCardDestinationHover(null)}
            onClick={() => handleEditDestinationDetails(Destination)}
          >
            <CardContent>
              <Typography variant="h6">{Destination.Name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {Destination.Type}
              </Typography>
              {/* Add more details as needed */}
              <Button variant="outlined" color="primary" sx={{ marginTop: 2 }}>
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </Container>

      <Dialog open={openDestinationDialog} onClose={handleCloseDestinationDialog}>
      <DialogTitle>Destination Details</DialogTitle>
        <DialogContent>
          {Object.entries(editedDestination).map(([key, value]) => (
            <div key={key}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>{key}:</Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>{value}</Typography>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDestinationDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <AppBar position="static" sx={{ width: '100%', marginLeft: '200px' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontSize: '24px' }}>
            Transportation
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        disableGutters
        maxWidth={false}
        sx={{ width: '100%', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '200px' }}
      >
        {transportationData.map((Transportation, index) => (
          <Card
            key={index}
            sx={{
              width: '100%',
              marginBottom: 2,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
              border: selectedTransportation && selectedTransportation.id === Transportation.id ? '2px solid #1976D2' : '1px solid #ddd',
            }}
            onMouseEnter={() => handleCardTransportationHover(Transportation)}
            onMouseLeave={() => handleCardTransportationHover(null)}
            onClick={() => handleEditTransportationDetails(Transportation)}
          >
            <CardContent>
              <Typography variant="h6">{Transportation.Name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {Transportation.Type}
              </Typography>
              {/* Add more details as needed */}
              <Button variant="outlined" color="primary" sx={{ marginTop: 2 }}>
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </Container>

      <Dialog open={openTransportationDialog} onClose={handleCloseTransportationDialog}>
      <DialogTitle>Transportation Details</DialogTitle>
        <DialogContent>
          {Object.entries(editedTransportation).map(([key, value]) => (
            <div key={key}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>{key}:</Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>{value}</Typography>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTransportationDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DestinationTransportation;