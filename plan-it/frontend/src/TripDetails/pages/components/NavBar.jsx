import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const page = useLocation();

    const links = [
      { path: "/trip-details/destinationtransportation", label: "Destination & Transportation" },
      { path: "/trip-details/accommodation", label: "Accommodation" },
      { path: "/trip-details/activities", label: "Activities" },
      { path: "/trip-details/restaurants", label: "Restaurants" },
      { path: "/trip-details/budgetsheet", label: "Budget Sheet" },
      { path: "/ideas/1", label: "Go Back to Trip Board", className: "bottom-link" }
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