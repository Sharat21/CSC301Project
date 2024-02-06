import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const IdeaForm = ({ onAddIdea }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() !== '') {
      onAddIdea({ content, date: new Date().toLocaleString() });
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Add a Note"
        variant="outlined"
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Add Idea
        </Button>
      </Box>
    </form>
  );
};

export default IdeaForm;
