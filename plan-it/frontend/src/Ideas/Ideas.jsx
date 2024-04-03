import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, CssBaseline, Typography, AppBar, Toolbar, CircularProgress} from '@mui/material';
import { format } from 'date-fns';
import IdeaList from './components/IdeaList';
import IdeaForm from './components/IdeaForm';
import Header from '../components/Header';
import AddIdeaDialog from './components/AddIdeaDialog';
import axios from 'axios';


const Ideas = () => {
  const { groupId, tripId, userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [deletedIdeas, setDeletedIdeas] = useState([]);
  const [group, setGroup] = useState(null);
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
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseURL}/ideas/unconfirmed-ideas-trip/${tripId}`);
        setIdeas(response.data); 
      } catch (error) {
        setError(error.message);
        console.log('Could not retrieve unconfirmed ideas.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [tripId]);

  useEffect(() => {
    const fetchGroup = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseURL}/trips/get_trip_ids/${groupId}`)
        setGroup(response.data);
      } catch (error) {
        setError(error.message);
        console.log('Could not retrieve group information.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchGroup();
  }, [groupId]);


  // useEffect to confirm or deny ideas
  useEffect(() => {
    const confirmIdeas = async () => {
      const currentDate = new Date();
      for (let i = 0; i < ideas.length; i++) {
        const ideaDate = new Date(ideas[i].Voting_End);
        if (currentDate >= ideaDate) {
          if (ideas[i].Votes.length * 2 >= group[0].Users.length) {
            const updatedIdea = {
              Votes: ideas[i].Votes,
              Confirmed: true
            }
            updateIdea(updatedIdea, ideas[i]._id);
          } else {
            if (!deletedIdeas.includes(ideas[i]._id)) {
              const updatedIdea = {
                Archived: true
              }
              deleteIdea(updatedIdea, ideas[i]._id);
              setDeletedIdeas([...deletedIdeas, ideas[i]._id]);
            }
          }
          const updatedIdeas = ideas.filter(idea => idea._id !== ideas[i]._id);
          setIdeas(updatedIdeas);
        }
      }
    }
    
    if (ideas.length && group) {
      confirmIdeas();
    }
  }, [ideas, group]);


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

  const updateIdea = async (idea, ideaId) => {
    try {
      const response = await axios.put(`${baseURL}/ideas/update-idea/${ideaId}`, idea);
    } catch (error) {
      console.error("Error updating idea: ", error.message);
    }
  }

  const deleteIdea = async (idea, ideaId) => {
    try {
      const response = await axios.put(`${baseURL}/ideas/update-idea/${ideaId}`, idea);
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
      Voting_End: format(endDate, 'yyyy-MM-dd'),
      Archived: false
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
          <Button component={Link} to={`/trip-details/destinationtransportation/${groupId}/${tripId}/${userId}`} variant="contained">
            To confirmed ideas
          </Button>
        </Toolbar>
      </AppBar>
  
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      ) : (
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
      )}
    </div>
  );
  
};

export default Ideas;