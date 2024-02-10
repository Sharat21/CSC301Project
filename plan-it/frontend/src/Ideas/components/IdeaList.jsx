import React from 'react';
import Idea from './Idea';
import { Box, Grid } from '@mui/material';

const IdeaList = ({ ideas }) => {
  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        {ideas.map((idea) => (
          <Grid item key={idea.id} xs={12} sm={6} md={4} lg={3}>
            <Idea content={idea.content} date={idea.date} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default IdeaList;