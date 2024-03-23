import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Button, Container, CssBaseline, Typography, AppBar, Toolbar} from '@mui/material';
import { format } from 'date-fns';
import IdeaList from './components/IdeaList';
import IdeaForm from './components/IdeaForm';
import AddIdeaDialog from './components/AddIdeaDialog';
import axios from 'axios';


const Ideas = () => {
  const { tripId } = useParams();
  const [ideas, setIdeas] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newIdea, setNewIdea] = useState({
    Name: '',
    Type: '',
    Description: '',
    link: '',
    price: ''
  });
  const baseURL = `http://localhost:14000/api/ideas`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/unconfirmed-ideas`);
        setIdeas(response.data); 
      } catch (error) {
        setError(error.message);
        console.log('Could not retrieve unconfirmed ideas.');
      }
    };

    fetchData();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const addIdea = async (idea) => {
    try {
      const response = await axios.post(`${baseURL}/create-idea`, idea);

      window.location.reload();
    } catch (error) {
      console.error("Error adding idea: ", error.message);
    }
  }

  const handleSubmit = () => {
    const currentDate = new Date();

    const submittedIdea = {
      ...newIdea,
      price: newIdea.price ? newIdea.price: '0',
      Votes: 0,
      Confirmed: false,
      Proposed_by: "",
      Date_Proposed: format(currentDate, 'yyyy-MM-dd'),
      Trip: "",
      Voting_End: format(currentDate, 'yyyy-MM-dd')
    };

    addIdea(submittedIdea);
  };

  return (
    <div style={{ width: "100%", position: "relative", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          
          <Typography variant="h6" sx={{ flex: 1, fontSize: "24px" }}>
            Ideas
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Button variant='contained' onClick={handleOpenDialog}>
          Add Idea
        </Button>
        <Button component={Link} to={`/trip-details/destinationtransportation/${tripId}`} variant="contained">
          Confirmed
        </Button>
        <AddIdeaDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          newIdea={newIdea}
          setNewIdea={setNewIdea}
          handleSubmit={handleSubmit}
        />
        <IdeaList ideas={ideas} />
      </Container>
    </div>
  );
};

export default Ideas;