// Trips.jsx

import React from "react";
import { AppBar, Toolbar, Typography, Container, Card, CardContent } from "@mui/material";

const tripsData = [
  {
    name: "Trip 1",
    duration: "3 days",
    date: "2024-02-10",
    description: "A wonderful trip to explore new places.",
  },
  {
    name: "Trip 2",
    duration: "5 days",
    date: "2024-03-15",
    description: "An adventurous journey to the mountains.",
  },
  // Add more trips as needed
];

const Trips = () => {
  return (
    <div style={{ width: '100%' }}>
      <AppBar position="static" sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontSize: "24px" }}>
            My Trips
          </Typography>
        </Toolbar>
      </AppBar>

      <Container disableGutters maxWidth={false}>
        {tripsData.map((trip, index) => (
          <Card key={index} sx={{ width: '100%', marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{trip.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Duration: {trip.duration}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {trip.date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {trip.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default Trips;
