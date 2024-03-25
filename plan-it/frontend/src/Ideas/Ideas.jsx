import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, CssBaseline, Typography, AppBar, Toolbar} from '@mui/material';
import { format } from 'date-fns';
import IdeaList from './components/IdeaList';
import IdeaForm from './components/IdeaForm';
import Header from '../components/Header';
import AddIdeaDialog from './components/AddIdeaDialog';
import axios from 'axios';


const Ideas = () => {
  const { tripId, groupId, userId } = useParams();
  const [ideas, setIdeas] = useState([]);
  const [group, setGroup] = useState({});
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newIdea, setNewIdea] = useState({
    Name: '',
    Type: '',
    Description: '',
    link: '',
    price: '',
    max_budget: ''
  });
  const baseURL = `http://localhost:14000/api`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/ideas/unconfirmed-ideas-trip/${tripId}`);
        setIdeas(response.data); 
      } catch (error) {
        setError(error.message);
        console.log('Could not retrieve unconfirmed ideas.');
      }
    };

    fetchData();
  }, [tripId]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const addIdea = async (idea) => {
    try {
      const response = await axios.post(`${baseURL}/ideas/create-idea`, idea);

      window.location.reload();
    } catch (error) {
      console.error("Error adding idea: ", error.message);
    }
  }

  const deleteIdea = async (ideaId) => {
    try {
      const response = await axios.delete(`${baseURL}/ideas/delete-idea/${ideaId}`);
      setIdeas(ideas.filter(idea => idea._id !== ideaId));
    } catch (error) {
      console.error("Error deleting idea: ", error.message);
    }
  }

  const handleSubmit = () => {
    const currentDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const submittedIdea = {
      ...newIdea,
      price: newIdea.price ? newIdea.price: '0',
      max_budget: newIdea.max_budget ? newIdea.max_budget : '0',
      Votes: [userId],
      Confirmed: false,
      Proposed_by: userId,
      Date_Proposed: format(currentDate, 'yyyy-MM-dd'),
      Trip: tripId,
      Voting_End: format(endDate, 'yyyy-MM-dd')
    };

    addIdea(submittedIdea);
  };

  return (
    <div style={{ width: "100%", position: "relative", minHeight: "100vh" }}>
      <Header userId={userId} />
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          
          <Typography variant="h6" sx={{ flex: 1, fontSize: "24px" }}>
            Ideas
          </Typography >
          <Button component={Link} to={`/trips/${groupId}/${userId}`} variant="contained" sx={{ marginRight: "8px" }}>
            Back to trips
          </Button>
          <Button component={Link} to={`/trip-details/destinationtransportation/${tripId}/${userId}/${groupId}`} variant="contained">
            To confirmed ideas
          </Button>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Button variant='contained' onClick={handleOpenDialog} sx={{ width: '100%', marginTop: "8px"}}>
          Add Idea
        </Button>
        <AddIdeaDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          newIdea={newIdea}
          setNewIdea={setNewIdea}
          handleSubmit={handleSubmit}
        />
        <IdeaList ideas={ideas} userId={userId} groupId={groupId} deleteIdea={deleteIdea} />
      </Container>
    </div>
  );
};

export default Ideas;