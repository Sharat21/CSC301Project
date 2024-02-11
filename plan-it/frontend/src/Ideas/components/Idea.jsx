import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Idea = ({ content, date }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {content}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Idea;
