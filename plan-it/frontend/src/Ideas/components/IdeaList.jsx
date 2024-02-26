import React, { useState, useEffect } from 'react';
import Idea from './Idea';
import { Box, Grid } from '@mui/material';

const IdeaList = ({ ideas }) => {
  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        {ideas.map((idea) => (
          <Grid item key={idea.id} xs={12} sm={6} md={4} lg={3}>
            <Idea 
              name={idea.Name} 
              type={idea.Type} 
              description={idea.Description}
              link={idea.link}
              price={idea.price}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default IdeaList;