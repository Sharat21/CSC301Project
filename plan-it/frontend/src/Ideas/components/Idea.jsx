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

const Idea = ({ name, type, description, link, price, max_budget, proposed_by, deadline }) => {
  const baseURL = `http://localhost:14000/api/users`;
  const [openDialog, setOpenDialog] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [user, setUser] = useState({
    Firstame: '',
    Lastname: ''
  });
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
        const response = await axios.get(`${baseURL}/get-user/${proposed_by}`);
        setUser(response.data);
      } catch (error) {
        console.log('Could not retrieve user\'s username.');
      }
    };

    fetchData();
  }, [proposed_by]);

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

  const cardStyle = {
    transition: 'background-color 0.3s',
    backgroundColor: hovered ? (colourCodes[type]?.darker || 'inherit') : (colourCodes[type]?.default || 'inherit'),
    height: '100%'
  };

  console.log(cardStyle);

  const IdeaDialog = ({ open, onClose, name, type, description, link, price, max_budget, user }) => {
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
          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            <IconButton>
              <RemoveIcon />
            </IconButton>
            <Typography variant="body2">0</Typography>
            <IconButton>
              <AddIcon />
            </IconButton>
          </Stack>
          <Typography variant="body2">
            Voting deadline: {deadline ? deadline : "No deadline given"}
          </Typography>
        </DialogContent>
        <DialogActions>
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
        user={user}
        deadline={deadline}
      />
    </div>

  );
};

export default Idea;
