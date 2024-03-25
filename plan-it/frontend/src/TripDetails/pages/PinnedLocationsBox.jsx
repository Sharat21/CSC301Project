import React, { useState } from 'react';
import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Toolbar,
    Typography
} from '@mui/material';

import './PinnedLocationsBox.css'; // Import the CSS file for styling

const PinnedLocationsBox = ({ pinnedLocations, onLocationClick, onRestaurantClick}) => {
    const accommodationLocations = pinnedLocations[0];
    const restaurantLocations = pinnedLocations[1];
    const [open, setOpen] = useState(false); // State to control dialog visibility
    const handleLocationClick = (location) => {
        // Handle click on a pinned location
        // For example, navigate to the location on the map
        // map.flyTo({ center: [location.longitude, location.latitude], zoom: 12 });
        console.log("the location is" + location);
        onLocationClick(location);
        handleClose(); // Close the dialog after handling the click
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleRestaurantClick = (res_location) =>{
        console.log("the location is" + res_location);

        onRestaurantClick(res_location);
        handleClose();
    }

    const handleOpen = () => {
        setOpen(true);
    };

    console.log(restaurantLocations);

    return (
        <>
            <Button onClick={handleOpen} className="pinned-locations-button">Pinned Locations</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="dialog-title">Pinned Locations</DialogTitle>
                <DialogContent>
                    <div className="location-type">
                        <h3 className="category-header">Accommodation</h3>
                        <ul className="location-list">
                            {/* Output Accommodation names */}
                            {accommodationLocations && accommodationLocations.Name && (
                            
                            <li className="location-item">
                                <button className="location-name" onClick={() => handleLocationClick(accommodationLocations.Name)}>
                                    {accommodationLocations.Name}
                                </button>
                            </li>
                            )}
                        </ul>
                    </div>
                    <div className="location-type">
                        <h3 className="category-header">Restaurant</h3>
                        <ul className="location-list">
                            {/* Output Restaurant names */}
                            {restaurantLocations && restaurantLocations.link && (
                                <li className="location-item">
                                    {/* <h4 className="location-name">{restaurantLocations.Name}</h4> */}
                                    <button className="location-name" onClick={() => handleRestaurantClick(restaurantLocations.link)}>
                                    {restaurantLocations.Name}
                                </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className="close-button">Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PinnedLocationsBox;
