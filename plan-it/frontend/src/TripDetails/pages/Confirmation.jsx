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
  ListItemText,
  List,
  ListItem
} from '@mui/material';
import NavBar from './components/NavBar';
import TripDetailsHeader from './components/TripDetailsHeader';
import { useParams } from 'react-router-dom';

const Confirmation = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [categorizedIdeas, setCategorizedIdeas] = useState({
        'Activity': [],
        'Accommodation': [],
        'Restaurant': [],
        'Transportation': []
    });
    const { tripId } = useParams();
    const baseURL = `http://localhost:14000/api/ideas`;

    useEffect(() => {
        const fetchConfirmedIdeas = async () => {
          try {
            const response = await axios.get(`${baseURL}/all-confirmed-ideas-trip/${tripId}`);
            const ideas = response.data;

            const categories = {
                'Destination': [],
                'Accommodation': [],
                'Activity': [],
                'Restaurant': [],
                'Transportation': []
            };

            ideas.forEach(idea => {
                const category = idea.Type;
                if (categories[category]) {
                    categories[category].push(idea.Name);
                }
            });

            setCategorizedIdeas(categories);
          } catch (error) {
            console.error("Fetching confirmed ideas failed: ", error);
          }
        };
      
        fetchConfirmedIdeas();
    }, [tripId]);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleConfirm = async () => {
        setOpenDialog(false);
    };
    const handleCancel = () => setOpenDialog(false);

    const confirmationDialog = (
        <Dialog open={openDialog} onClose={handleCancel}>
            <DialogTitle>Confirm Finalization</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to finalize all planned ideas for the trip?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm} color="secondary">No</Button>
                <Button onClick={handleConfirm} color="primary">Yes</Button>
            </DialogActions>
        </Dialog>
    );

  return (
    <div style={{ width: '100%' }}>
      <TripDetailsHeader/>
      <NavBar/>
      <AppBar position="static" sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontSize: '24px' }}>
            Confirmation
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Card style={{ padding: '20px', margin: 'auto', maxWidth: '800px', maxHeight: 'auto' }}>
            <CardContent>
                <Typography gutterBottom>
                    Are you content with all the ideas planned for the trip and would you like to finalize it?
                </Typography>
                <Button variant="outlined" color="primary" style={{ marginTop: '20px'}} onClick={handleOpenDialog}>
                    Finalize Ideas
                </Button>
            </CardContent>
        </Card>
      </Container>
      {confirmationDialog}
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Card style={{ padding: '20px' }}>
        <CardContent>
          {Object.keys(categorizedIdeas).map((category) => (
            <Card key={category} style={{ marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                  {category}
                </Typography>
                {categorizedIdeas[category].length > 0 ? (
                  categorizedIdeas[category].map((ideaName, index) => (
                    <Typography key={index} variant="body1" style={{ marginLeft: '20px' }}>
                      • {ideaName}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" style={{ marginLeft: '20px' }}>
                    No ideas confirmed for this category.
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </Container>
  </div>
  );
};

export default Confirmation;