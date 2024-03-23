import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link, useLocation, useParams } from 'react-router-dom';

const NavBar = () => {
    const page = useLocation();
    const tripId = page["pathname"].split("/")[3];

    const links = [
      { path: `/trip-details/destinationtransportation/${tripId}`, label: "Destination & Transportation" },
      { path: `/trip-details/accommodation/${tripId}`, label: "Accommodation" },
      { path: `/trip-details/activities/${tripId}`, label: "Activities" },
      { path: `/trip-details/restaurants/${tripId}`, label: "Restaurants" },
      { path: `/trip-details/budgetsheet/${tripId}`, label: "Budget Sheet" },
      { path: `/trip-details/map/${tripId}`, label: "Map" },
      { path: `/trip-details/confirmation/${tripId}`, label: "Confirmation" },
      { path: `/ideas/0`, label: "Go Back to Trip Board" }
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