import React from 'react';
import { Card, CardContent, Typography, Link } from '@mui/material';

const Idea = ({ name, type, description, link, price, max_budget }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {name ? name : "No name given"}
        </Typography>
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
      </CardContent>
    </Card>
  );
};

export default Idea;
