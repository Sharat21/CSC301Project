import React, { useState } from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import IdeaList from './components/IdeaList';

const Ideas = () => {
  const [ideas, setIdeas] = useState([{id: 0, content: "hello", date: new Date().toLocaleString()}, {id: 1, content: "yessir", date: new Date().toLocaleString()}]);

  const addIdea = (newIdea) => {
    setIdeas([...ideas, { id: ideas.length + 1, ...newIdea }]);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography variant="h4" align="center" gutterBottom>
        Ideas
      </Typography>
      <IdeaList ideas={ideas} />
    </Container>
  );
};

export default Ideas;