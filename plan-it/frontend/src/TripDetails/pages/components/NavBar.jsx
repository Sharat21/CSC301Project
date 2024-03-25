import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link, useLocation, useParams } from 'react-router-dom';

const NavBar = () => {
    const { groupId, tripId, userId } = userParams()

    const links = [
      { path: `/trip-details/destinationtransportation/${groupId}/${tripId}/${userId}`, label: "Destination & Transportation" },
      { path: `/trip-details/accommodation/${groupId}/${tripId}/${userId}`, label: "Accommodation" },
      { path: `/trip-details/activities/${groupId}/${tripId}/${userId}`, label: "Activities" },
      { path: `/trip-details/restaurants/${groupId}/${tripId}/${userId}`, label: "Restaurants" },
      { path: `/trip-details/budgetsheet/${groupId}/${tripId}/${userId}`, label: "Budget Sheet" },
      { path: `/trip-details/map/${groupId}/${tripId}/${userId}`, label: "Map" },
      { path: `/trip-details/confirmation/${groupId}/${tripId}/${userId}`, label: "Confirmation" },
      { path: `/ideas/${groupId}/${tripId}/${userId}`, label: "Go Back to Trip Board" }
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