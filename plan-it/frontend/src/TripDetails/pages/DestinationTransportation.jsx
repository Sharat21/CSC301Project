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

  const DestinationDialog = ({ open, onClose, destination }) => {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '30px' }}>{destination.Name}</DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="body1"><strong>Proposed by:</strong> {destination.Proposed_by}</Typography>
          <Typography variant="body1"><strong>Trip:</strong> {destination.Trip}</Typography>
          <Typography 
            variant="body1"><strong>Link:</strong> {destination.link ?
            <a href={destination.link} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>{destination.link}</a> : "No link available" }
          </Typography>
          <Typography variant="body1"><strong>Price:</strong> {destination.price}</Typography>
          <Typography 
            variant="body1"><strong>Description:</strong> {destination.description ? destination.description : "No description available"}
          </Typography>
        </DialogContent>
        <DialogContent>
          {/* To add more space at the bottom */}
          <div style={{ height: '10px' }}></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const TransportationDialog = ({ open, onClose, transportation }) => {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '30px' }}>{transportation.Name}</DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="body1"><strong>Proposed by:</strong> {transportation.Proposed_by}</Typography>
          <Typography variant="body1"><strong>Trip:</strong> {transportation.Trip}</Typography>
          <Typography 
            variant="body1"><strong>Link:</strong> {transportation.link ?
            <a href={transportation.link} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>{transportation.link}</a> : "No link available" }
          </Typography>
          <Typography variant="body1"><strong>Price:</strong> {transportation.price}</Typography>
          <Typography 
            variant="body1"><strong>Description:</strong> {transportation.description ? transportation.description : "No description available"}
          </Typography>
        </DialogContent>
        <DialogContent>
          {/* To add more space at the bottom */}
          <div style={{ height: '10px' }}></div>
        </DialogContent>
        <DialogActions>
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

      <DestinationDialog open={openDestinationDialog} onClose={handleCloseDestinationDialog} destination={editedDestination}></DestinationDialog>

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

      <TransportationDialog open={openTransportationDialog} onClose={handleCloseTransportationDialog} transportation={editedTransportation}></TransportationDialog>
    </div>
  );
};

export default DestinationTransportation;