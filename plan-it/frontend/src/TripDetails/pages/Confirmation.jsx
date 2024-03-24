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
  ListItem,
  CircularProgress
} from '@mui/material';
import emailjs from 'emailjs-com';
import NavBar from './components/NavBar';
import TripDetailsHeader from './components/TripDetailsHeader';
import { useParams } from 'react-router-dom';

const Confirmation = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openCancelDialog, setOpenCancelDialog] = useState(false)
    const [tripName, setTripName] = useState('');
    const [finalized, setFinalized] = useState([]);
    const [finalizedNames, setFinalizedNames] = useState([]);
    const [categorizedIdeas, setCategorizedIdeas] = useState({
        'Activity': [],
        'Accommodation': [],
        'Restaurant': [],
        'Transportation': []
    });
    const { groupId, tripId, userId } = useParams();
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [hasFinalized, setHasFinalized] = useState(false);
    const [trip, setTrip] = useState({});
    const [group, setGroup] = useState({});
    const baseURLIdeas = `http://localhost:14000/api/ideas`;
    const baseURLTrips = `http://localhost:14000/api/trips`;
    const baseURLUsers = `http://localhost:14000/api/users`;
    const baseURLGroups = `http://localhost:14000/api/groups`;
    const [recipient, setRecipient] = useState('ryanr.4849@gmail.com');
    const serviceID = 'service_0jm96eq';
    const templateID = 'template_r63buj5';
    const public_key = 'HjoZ2e7hdmfdThEB1';

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const trip_response = await axios.get(`${baseURLTrips}/get-trip/${tripId}`);
                setTrip(trip_response.data);
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
            const names = userResponses.map(res => (`${res.data.Firstname} ${res.data.Lastname}`));
            if (names.includes(username)) {
              setHasFinalized(true);
            }
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

        const fetchUser = async () => {
          try {
            const user_response = await axios.get(`${baseURLUsers}/get-user/${userId}`);
            setUser(user_response.data);
            setUsername(`${user_response.data.Firstname} ${user_response.data.Lastname}`)
            setRecipient(user_response.data.Email);
          } catch (error) {
              console.error("Fetching user failed: ", error);
          }
        };

        const fetchGroup = async () => {
          try {
            const group_response = await axios.get(`${baseURLGroups}/get-group/${groupId}`);
            setGroup(group_response.data);
            console.log(group_response.data);
          } catch (error) {
            console.error("Fetching group failed: ", error);
          }
        };

        const fetchData = async () => {
          setIsLoading(true);
          try {
            await fetchUser();
            const finalizedUserIds = await fetchTrip();
            if (finalizedUserIds && finalizedUserIds.length > 0){
              await fetchUserNames(finalizedUserIds);
            }
            await fetchConfirmedIdeas();
            await fetchGroup();
          } catch (error) {
            console.error("Error during data fetch: ", error);
          } finally {
            setIsLoading(false);
          }
        };

        fetchData();
    }, [groupId, userId, tripId, username]);

    const handleOpenDialog = () => setOpenDialog(true);

    const handleConfirm = async () => {
        setOpenDialog(false);
        try {
          const response = await axios.post(`${baseURLTrips}/update-finalized/${tripId}/${userId}`);;
          if (response.data.success) {
            console.log(response.data.message);
            setFinalizedNames(prev => [...prev, user.Name]);
          }
        } catch (error) {
          console.error('Error updating trip finalization:', error);
        }
        await sendEmail();
    };
    const handleCancel = () => setOpenDialog(false);

    const handleCancelVote = async () => {
      // setHasFinalized(false)
      // logic to remove userid from list
      setOpenCancelDialog(false);
    }

    const handleCancelCancel = () => {
      setOpenCancelDialog(false);
    }

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

    const cancelFinalizationDialog = (
      <Dialog open={openCancelDialog} onClose={handleCancelCancel}>
        <DialogTitle>Cancel Finalization</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to cancel your finalization of the trip plans?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelCancel} color="primary">
              No
            </Button>
            <Button onClick={handleCancelVote} color="secondary">
              Yes
            </Button>
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
      {isLoading ? (
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Container>
      ) : (
        <div>
        <Container style={{ marginTop: '20px' }}>
          <Card style={{ padding: '20px', margin: 'auto', maxWidth: '800px', maxHeight: 'auto' }}>
              <CardContent>
                {hasFinalized ? (
                  <>
                    <Typography gutterBottom>
                      You have already voted to finalize this trip. Would you like to cancel your vote?
                    </Typography>
                    <Button variant="outlined" color="secondary" style={{ marginTop: '20px', marginBottom: '20px' }}>
                      Cancel Finalization
                    </Button>
                  </>
                  ) : (
                  <>
                    <Typography gutterBottom>
                      Are you content with all the ideas planned for the trip and would you like to finalize it?
                      <br></br>
                      <br></br>
                      When all group members have finalized, you will receive an email with the final trip initerary. 
                    </Typography>
                    <Button variant="outlined" color="primary" style={{ marginTop: '20px', marginBottom: '20px' }} onClick={handleOpenDialog}>
                      Finalize Ideas
                    </Button>
                  </>
                  )}
                  <List>
                    Members who have finalized: <br></br>
                    {finalizedNames.length > 0 ? (
                      finalizedNames.map((fullname, index) => (
                        <ListItem key={index}>
                          <ListItemText>• {fullname}</ListItemText>
                        </ListItem>
                      ))
                    ) : (
                      <Typography variant="body2" style={{ marginTop: '20px' }}>
                        No members have finalized yet.
                      </Typography>
                    )
                    }
                  </List>
              </CardContent>
          </Card>
        </Container>
        {confirmationDialog}
        {cancelFinalizationDialog}
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
      )}
  </div>
  );
};

export default Confirmation;