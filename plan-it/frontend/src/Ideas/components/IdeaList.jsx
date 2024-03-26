import React, { useState, useEffect } from 'react';
import Idea from './Idea';
import { Box, Grid } from '@mui/material';

const IdeaList = ({ ideas, userId, groupId, deleteIdea }) => {
  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        {ideas.map((idea) => (
          <Grid item key={idea._id} xs={12} sm={6} md={4} lg={3}>
              <Idea
                ideaId={idea._id}
                name={idea.Name} 
                type={idea.Type} 
                description={idea.Description}
                link={idea.link}
                price={idea.price}
                max_budget={idea.max_budget}
                proposed_by={idea.Proposed_by}
                deadline={idea.Voting_End}
                votes={idea.Votes}
                confirmed={idea.Confirmed}
                userId={userId}
                groupId={groupId}
                deleteIdea={deleteIdea}
              />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default IdeaList;
