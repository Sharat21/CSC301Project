import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";

const Header = ({ userId }) => {
    const navigate = useNavigate();

    const handleSettings = () => {
        navigate(`/settings/${userId}`);
    };
    return (
        <AppBar position="static" sx={{ backgroundColor: '#2196f3' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    PLANIT
                </Typography>

                <IconButton color="inherit" edge="end" onClick={handleSettings}>
                    <SettingsIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;