import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link, useLocation, useParams } from 'react-router-dom';

const NavBar = () => {
    const page = useLocation();
    const tripId = page["pathname"].split("/")[3];
    const userId = page["pathname"].split("/")[4];

    const links = [
      { path: `/trip-details/destinationtransportation/${tripId}/${userId}`, label: "Destination & Transportation" },
      { path: `/trip-details/accommodation/${tripId}/${userId}`, label: "Accommodation" },
      { path: `/trip-details/activities/${tripId}/${userId}`, label: "Activities" },
      { path: `/trip-details/restaurants/${tripId}/${userId}`, label: "Restaurants" },
      { path: `/trip-details/budgetsheet/${tripId}/${userId}`, label: "Budget Sheet" },
      { path: `/trip-details/map/${tripId}/${userId}`, label: "Map" },
      { path: `/trip-details/confirmation/${tripId}/${userId}`, label: "Confirmation" },
      { path: `/ideas/${tripId}/${userId}`, label: "Go Back to Trip Board" }
    ];

    return (
      <List component="nav" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        {links.map((link, index) =>  
          <ListItem 
            key={index}
            disablePadding
            style={{ width: '100%' }}
          >
            <ListItemButton 
              component={Link}
              to={link.path}
              style={{
                justifyContent: 'center',
                background: location.pathname === link.path ? '#cfe8fc' : 'inherit',
                color: location.pathname === link.path ? 'primary' : 'inherit',
              }}
            >
              <ListItemText primary={link.label} align='center'/>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    );
  };
  
  export default NavBar;