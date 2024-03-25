import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Link,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';

const Idea = ({ ideaId, name, type, description, link, price, max_budget, proposed_by, deadline, votes, confirmed, userId, groupId, deleteIdea }) => {
  const baseURL = `http://localhost:14000/api`;
  const [openDialog, setOpenDialog] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [voteList, setVoteList] = useState(votes);
  const [user, setUser] = useState({
    Firstame: '',
    Lastname: ''
  });
  const [group, setGroup] = useState(null)
  const colourCodes = {
    'Destination': { default: 'rgba(255, 250, 160, 0.5)', darker: 'rgba(255, 250, 160, 1)' },
    'Transportation': { default: 'rgba(167, 199, 231, 0.5)', darker: 'rgba(167, 199, 231, 1)' },
    'Activity': { default: 'rgba(195, 177, 225, 0.5)', darker: 'rgba(195, 177, 225, 1)' },
    'Restaurant': { default: 'rgba(250, 160, 160, 0.5)', darker: 'rgba(250, 160, 160, 1)' },
    'Accommodation': { default: 'rgba(193, 225, 193, 0.5)', darker: 'rgba(193, 225, 193, 1)' }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/users/get-user/${proposed_by}`);
        setUser(response.data);
      } catch (error) {
        console.log('Could not retrieve user\'s username.');
      }
    };

    const fetchGroup = async () => {
      try {
        const response = await axios.get(`${baseURL}/trips/get_trip_ids/${groupId}`);
        setGroup(response.data);
      } catch (error) {
        setError(error.message);
        console.log('Could not retrieve group');
      }
    }

    fetchGroup();
    fetchData();
  }, [proposed_by, groupId]);


  const handleCardClick = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const updateIdea = async (idea) => {
    try {
      const response = await axios.put(`${baseURL}/ideas/update-idea/${ideaId}`, idea);
    } catch (error) {
      console.error("Error updating idea: ", error.message);
    }
  }

  const onVote = () => {
    if (voteList.includes(userId)) {
      const updatedVotes = votes.filter(id => id !== userId);
      const updatedIdea = {
        Votes: updatedVotes,
        Confirmed: confirmed
      }
      updateIdea(updatedIdea);
      setVoteList(updatedVotes);
    } else {
      let updatedVotes;
      if (!votes.includes(userId)) {updatedVotes = [...votes, userId]} 
      else {updatedVotes = [...votes]}
      const updatedIdea = {
        Votes: updatedVotes,
        Confirmed: confirmed
      }
      updateIdea(updatedIdea);
      setVoteList(updatedVotes);
    }
  }

  const handleDelete = () => {
    deleteIdea(ideaId);
    setOpenDialog(false);
  }

  const cardStyle = {
    transition: 'background-color 0.3s',
    backgroundColor: hovered ? (colourCodes[type]?.darker || 'rgba(204, 204, 204, 1)') : (colourCodes[type]?.default || 'rgba(255, 255, 255, 1)'),
    height: '100%'
  };

  const IdeaDialog = ({ open, onClose, name, type, description, link, price, max_budget, proposed_by, user, voteList, confirmed }) => {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { backgroundColor: colourCodes[type]?.darker || 'rgba(255, 255, 255, 1)' } }}>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '30px' }}>{name}</DialogTitle>
        <DialogContent>   
          <Typography color="text.secondary">
            Type: {type ? type : "No type given"}
          </Typography>
          <Typography variant="body2">
            Description: {description ? description : "No description available"}
          </Typography>
          <Typography variant="body2">
            Link: {link ? link: "No link given"}
          </Typography>
          <Typography variant="body2">
            Price: {price ? price : "No price given"}
          </Typography>
          <Typography variant="body2">
            Max Budget: {max_budget ? max_budget : "No budget given"}
          </Typography>
          <Typography variant="body2">
            Proposed By: {(user.Firstname) ? (user.Firstname + " " + user.Lastname): "No user found"}
          </Typography>

          {/* voting features */}
          <Stack direction="row" spacing={2} alignItems="center" mt={2} sx={{ marginBottom: '8px' }}>
            <Typography variant="body2">Votes: {voteList.length} / {group ? group[0].Users.length : '0'} </Typography>
            <IconButton onClick={onVote}>
              {voteList.includes(userId) ? <RemoveIcon /> : <AddIcon /> }
            </IconButton>
          </Stack>
          <Typography variant="body2">
            Voting deadline: {deadline ? deadline : "No deadline given"}
          </Typography>
          <Typography variant="body2">
            {voteList.includes(userId) ? 
              "You have already voted on this! Press \"-\" if you would like to remove your vote." :
              "You have not voted yet! Press \"+\" if you like this idea."
            }
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="error">Delete Idea</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <div style={{height: '100%'}}>
      <Card 
        onClick={handleCardClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={cardStyle}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {name ? name : "No name given"}
          </Typography>
          <Typography variant="body2">
              Proposed By: {(user.Firstname) ? (user.Firstname + " " + user.Lastname): "No user found"}
          </Typography>
        </CardContent>
      </Card>

      <IdeaDialog
        open={openDialog} 
        onClose={handleCloseDialog} 
        name={name} 
        type={type} 
        description={description} 
        link={link} 
        price={price} 
        max_budget={max_budget} 
        proposed_by={proposed_by}
        user={user}
        deadline={deadline}
        voteList={voteList}
      />
    </div>

  );
};

export default Idea;
