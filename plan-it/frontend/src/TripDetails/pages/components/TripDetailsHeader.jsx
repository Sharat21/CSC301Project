import React from 'react';
// import './TripDetailsHeader.css';
import { AppBar, Toolbar, Typography } from '@mui/material';

const TripDetailsHeader = () => {
  return (
    <AppBar position="static" sx={{ borderBottom: '2px solid white' }}>
      <Toolbar>
        <Typography 
          variant="h4" 
          component="div"
          align="center"
          sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Trip Details
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TripDetailsHeader;