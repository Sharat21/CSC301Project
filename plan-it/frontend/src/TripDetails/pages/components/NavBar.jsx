import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link, useLocation, useParams } from 'react-router-dom';

const NavBar = () => {
    // const page = useLocation();
    // const tripId = page["pathname"].split("/")[3];
    // const userId = page["pathname"].split("/")[4];
    const { tripId, userId, groupId } = useParams();

    const links = [
      { path: `/trip-details/destinationtransportation/${tripId}/${userId}/${groupId}`, label: "Destination & Transportation" },
      { path: `/trip-details/accommodation/${tripId}/${userId}/${groupId}`, label: "Accommodation" },
      { path: `/trip-details/activities/${tripId}/${userId}/${groupId}`, label: "Activities" },
      { path: `/trip-details/restaurants/${tripId}/${userId}/${groupId}`, label: "Restaurants" },
      { path: `/trip-details/budgetsheet/${tripId}/${userId}/${groupId}`, label: "Budget Sheet" },
      { path: `/trip-details/map/${tripId}/${userId}/${groupId}`, label: "Map" },
      { path: `/trip-details/confirmation/${tripId}/${userId}/${groupId}`, label: "Confirmation" },
      { path: `/ideas/${tripId}/${groupId}/${userId}`, label: "Go Back to Trip Board" }
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