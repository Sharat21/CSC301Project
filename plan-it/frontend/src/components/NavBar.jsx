// navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
};

const buttonStyle = {
  marginRight: '10px',
};

const fancyText = {
  fontFamily: 'cursive',
  fontSize: '24px',
  transition: 'transform 0.5s',
}

function Navbar() {
  return (
    <AppBar position="static" style={{ backgroundColor: '#2196f3' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={linkStyle}>
            <span style={fancyText}>PlanIt</span>
          </Link>
        </Typography>
        <Button color="inherit" style={buttonStyle} component={Link} to="/how">
          How
        </Button>
        <Button color="inherit" style={buttonStyle} component={Link} to="/about">
          About
        </Button>
        <div>
          <Button color="inherit" style={buttonStyle} component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" style={buttonStyle} component={Link} to="/register">
            Register
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
