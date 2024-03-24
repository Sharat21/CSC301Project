import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Header from '../../../components/Header';

const TripDetailsHeader = ({ userId }) => {
  console.log('TripDetailsHeader userId:', userId);
  return (
    <div>
      <Header userId={userId} />
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
    </div>
  );
};

export default TripDetailsHeader;