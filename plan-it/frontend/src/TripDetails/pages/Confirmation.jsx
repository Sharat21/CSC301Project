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
import emailjs from 'emailjs-com';
import NavBar from './components/NavBar';
import TripDetailsHeader from './components/TripDetailsHeader';
import { useParams } from 'react-router-dom';

const Confirmation = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [tripName, setTripName] = useState('');
    const [finalized, setFinalized] = useState([]);
    const [finalizedNames, setFinalizedNames] = useState([]);
    const [username, setUsername] = useState('');
    const [categorizedIdeas, setCategorizedIdeas] = useState({
        'Activity': [],
        'Accommodation': [],
        'Restaurant': [],
        'Transportation': []
    });
    const { tripId, userId } = useParams();
    const baseURLIdeas = `http://localhost:14000/api/ideas`;
    const baseURLTrips = `http://localhost:14000/api/trips`;
    const baseURLUsers = `http://localhost:14000/api/users`;
    const sender = 'PlanIt301App@gmail.com';
    const recipient = 'ryanr.4849@gmail.com';
    const serviceID = 'service_0jm96eq';
    const templateID = 'template_r63buj5';
    const public_key = 'HjoZ2e7hdmfdThEB1';

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const trip_response = await axios.get(`${baseURLTrips}/get-trip/${tripId}`);
                setTripName(`<h2> ${trip_response.data.Name} Final Itinerary </h2>`);
                setFinalized(trip_response.data.UsersFinalized ? trip_response.data.UsersFinalized : []);
                return trip_response.data.UsersFinalized;
            } catch (error) {
                console.error("Fetching trip name failed: ", error);
            }
            return [];
        }

        const fetchUserNames = async(userIds) => {
          try{
            const userPromises = userIds.map(user_id => axios.get(`${baseURLUsers}/get-user/${user_id}`));
            const userResponses = await Promise.all(userPromises);
            const names = userResponses.map(res => `${res.data.Firstname} ${res.data.Lastname}`);
            setFinalizedNames(names);
          } catch (err) {
            console.error("Fetching user names failed", error);
          }
          
        }

        const fetchConfirmedIdeas = async () => {
          try {
            const response = await axios.get(`${baseURLIdeas}/all-confirmed-ideas-trip/${tripId}`);
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
                    categories[category].push({name: idea.Name, description: idea.Description, price: idea.price});
                }
            });

            setCategorizedIdeas(categories);
          } catch (error) {
            console.error("Fetching confirmed ideas failed: ", error);
          }
        };

        const fetchData = async () => {
          const finalizedUserIds = await fetchTrip();
          if (finalizedUserIds && finalizedUserIds.length > 0){
            await fetchUserNames(finalizedUserIds);
          }
          await fetchConfirmedIdeas();
        }
      
        fetchData();
    }, [tripId]);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleConfirm = async () => {
        // setOpenDialog(false);
        // await sendEmail();
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

    const generateEmail = () => {
        let htmlContent = '<div style="font-family: Arial, sans-serif;">';

        Object.keys(categorizedIdeas).forEach((category) => {
            htmlContent += `<div style="margin-bottom: 20px;">`;
            htmlContent += `<h2 style="font-weight: bold;">${category}</h2>`;

            const ideasList = categorizedIdeas[category].map(idea => 
                `<p style="margin-left: 20px; font-weight: bold;">${idea.name}</p>
                 <p style="margin-left: 30px;">Description: ${idea.description}</p>
                 <p style="margin-left: 30px;">Price: ${idea.price}</p>`
            ).join('');

            htmlContent += ideasList || `<p style="margin-left: 20px;">No ideas confirmed for this category.</p>`;
            htmlContent += `</div>`;
            });

        htmlContent += '</div>';
        return htmlContent;
    };

    const sendEmail = async () => {
        const emailContent = generateEmail();

        const templateParams = {message: emailContent, recipient: recipient, trip_name: tripName};

        try {
            const response = await emailjs.send(serviceID, templateID, templateParams, public_key);
            console.log('Email sent successfully!', response.status, response.text);
        } catch (err) {
            console.error('Failed to send email.', err);
        }
    };

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
                    <br></br>
                    <br></br>
                    When all group members have finalized, you will receive an email with the final trip initerary. 
                </Typography>
                <Button variant="outlined" color="primary" style={{ marginTop: '20px'}} onClick={handleOpenDialog}>
                    Finalize Ideas
                </Button>
                <List>
                  {finalizedNames.length > 0 ? (
                    finalizedNames.map((fullName, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={fullname} />
                      </ListItem>
                    ))
                  ) : (
                    <Typography variant="body2" style={{ marginTop: '20px' }}>
                      No members have finalized yet.
                    </Typography>
                  )}
                </List>
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
                  categorizedIdeas[category].map((idea, index) => (
                    <Typography key={index} variant="body1" style={{ marginLeft: '20px' }}>
                      • {idea.name}
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