import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import './maps.css'; // Import the maps.css file
import SearchBar from './SearchBar';
import axios from 'axios';
import PinnedLocationsBox from './PinnedLocationsBox'; // Import the PinnedLocationsBox component
import { Marker } from 'mapbox-gl'; // Import Mapbox GL JS library and Marker
import markerIcon from './marker.png'; // Import the marker.png file

import {
    AppBar,
    Toolbar,
    Typography,
} from '@mui/material';
import NavBar from './components/NavBar';
import TripDetailsHeader from './components/TripDetailsHeader';

const MapComponent = () => {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [pinnedLocations, setPinnedLocations] = useState([]);
    const markers = useRef([]); // Ref to store marker instances
    const baseURL = `http://localhost:14000/api/ideas`;
    const { tripId, userId } = useParams();
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhcmF0MjEiLCJhIjoiY2x0MHFrZzA2MTFjZjJrbm40dHZhZGVndSJ9.O43Ja8GWOrgq286dvKnxCA';
    
        const newMap = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-79.3832, 43.6532],
            zoom: 12,
            pitch: 20,
            attributionControl: false,
            pitchWithRotate: false,
        });
    
        // Calculate padding coordinates relative to the center
        const paddingPercentage = 5; // Percentage of the map's span for padding
        const paddingLongitude = 0.02 * paddingPercentage; // Longitude padding in degrees
        const paddingLatitude = 0.015 * paddingPercentage; // Latitude padding in degrees
    
        const paddingCoordinates = [
            [-79.3832 - paddingLongitude, 43.6532 + paddingLatitude], // Top-left corner of the padding area
            [-79.3832 + paddingLongitude, 43.6532 - paddingLatitude]  // Bottom-right corner of the padding area
        ];
    
        // Fit the map to contain the specified bounding box with padding
        newMap.fitBounds(paddingCoordinates);
    
        newMap.on('load', () => {
            newMap.doubleClickZoom.disable();
        });
    
        setMap(newMap);
    
        return () => newMap.remove();
    }, []);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const destinationResponse = await axios.get(`${baseURL}/confirmed-ideas-trip/Accommodation/${tripId}`);
                const restaurantResponse = await axios.get(`${baseURL}/confirmed-ideas-trip/Restaurant/${tripId}`);
                const activityResponse = await axios.get(`${baseURL}/confirmed-ideas-trip/Activity/${tripId}`);

                const mergedData = [
                    ...destinationResponse.data,
                    ...restaurantResponse.data,
                    ...activityResponse.data
                ];                
                setPinnedLocations(mergedData);
            } catch (error) {
                setError(error.message);
                console.log('Could not retrieve pinned locations.');
            }
        };

        fetchData();
    }, [tripId]);

    const handleSearch = async (query) => {
        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`);
            const data = await response.json();
            setSuggestions(data.features);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handlePinned = async (location) => {
        console.log("location:  " + location);
        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`);
            const data = await response.json();
    
            if (data.features && data.features.length > 0) {
                const bestMatch = data.features.reduce((prev, curr) => {
                    const prevDistance = mapboxgl.LngLat.convert(prev.center).distanceTo(map.getCenter());
                    const currDistance = mapboxgl.LngLat.convert(curr.center).distanceTo(map.getCenter());
                    return prevDistance < currDistance ? prev : curr;
                });
                var longitude = -1;
                var latitude = -1;
                [longitude, latitude] = bestMatch.center;
                map.flyTo({ center: bestMatch.center, zoom: 18 });
                const marker = new mapboxgl.Marker()
                    .setDraggable(false) 
                    .setLngLat([longitude, latitude])
                   // .pitchAlignment('map')
                    .addTo(map);
                
                markers.current.push(marker);

                console.log( latitude + "location is")
                return bestMatch;

            } else {
                console.log('No suggestions found for:', location);
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };
    
    const pinRestaurantsNearAccommodation = async (location) => {
        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`);
            const data = await response.json();
            
            if (data.features && data.features.length > 0) {
                const bestMatch = data.features.reduce((prev, curr) => {
                    const prevDistance = mapboxgl.LngLat.convert(prev.center).distanceTo(map.getCenter());
                    const currDistance = mapboxgl.LngLat.convert(curr.center).distanceTo(map.getCenter());
                    return prevDistance < currDistance ? prev : curr;
                });
                map.flyTo({ center: bestMatch.center, zoom: 16 });
                const markerElement = document.createElement('div');
                markerElement.className = 'marker';
    
                // Create the marker with the custom element
                const marker = new mapboxgl.Marker({
                    element: markerElement, // Use a custom DOM element for the marker
                    color: '#FF0000',
                    draggable: false,
                    anchor: 'center',
                    rotationAlignment: 'viewport',
                    pitchAlignment: 'map',
                    scale: 1.5,
                    offset: [0, -20],
                });
    
                // Set the marker's position
                marker.setLngLat(bestMatch.center);
    
                // Add the marker to the map
                marker.addTo(map);
    
                // Add event listener for map move event
                map.on('move', () => {
                    const mapBounds = map.getBounds();
                    const markerLngLat = marker.getLngLat();
                    
                    // Check if marker is within map bounds
                    if (!mapBounds.contains(markerLngLat)) {
                        markerElement.style.visibility = 'hidden'; // Hide the marker
                    } else {
                        markerElement.style.visibility = 'visible'; // Show the marker
                    }
                });


                  console.log( bestMatch.center + "location is")
            } else {
                console.log('No suggestions found for:', location);
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        if (!map || !suggestion || !suggestion.center) return;

        let zoomLevel = 12;

        if (suggestion.place_type.includes('country')) {
            zoomLevel = 12;
        } else if (suggestion.place_type.includes('region')) {
            zoomLevel = 14;
        } else if (suggestion.place_type.includes('place')) {
            zoomLevel = 16;
        } else if (suggestion.place_type.includes('address')) {
            zoomLevel = 18;
        }

        map.flyTo({ center: suggestion.center, zoom: zoomLevel });
        setSuggestions([]);
    };

    const renderSuggestions = () => {
        return (
            <ul className="suggestions">
                {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion.place_name}
                    </li>
                ))}
            </ul>
        );
    };

    // useEffect(() => {
    //     if (!map) return;

    //     const resizer = new ResizeObserver(() => map.resize());
    //     resizer.observe(mapContainer.current);

    //     return () => resizer.disconnect();
    // }, [map]);

    const moveHandler = () => {
        // Update the position of each marker when the map moves
        markers.current.forEach(marker => {
            const markerElement = marker.getElement();
            if (markerElement) {
                const markerLngLat = marker.getLngLat();
                console.log('Marker position:', markerLngLat);
    
                // Check if the marker position is valid
                if (markerLngLat.isValid()) {
                    const markerPos = map.project(markerLngLat);
                    const containerPos = map.project(markerPos);
                    console.log('Container position:', containerPos);
    
                    markerElement.style.transform = `translate(-50%, -50%) translate(${containerPos.x}px, ${containerPos.y}px)`;
                } else {
                    console.warn('Invalid marker position:', markerLngLat);
                }
            }
        });
    };
    
    return (
        <div>
            <TripDetailsHeader userId={userId}/>
            <NavBar/>
            <AppBar position="static" sx={{ width: '100%' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ fontSize: '24px' }}>
                        Map
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="pinned-locations-box-container">
                <PinnedLocationsBox pinnedLocations={pinnedLocations} onLocationClick={handlePinned} onRestaurantClick={pinRestaurantsNearAccommodation} />
            </div>
            <div className="container">
                <div className="search-container">
                    <SearchBar onSearch={handleSearch} />
                    <div className={`${suggestions.length > 0 ? 'transition ease-in duration-300 opacity-100' : 'transition ease-out duration-300 opacity-0 invisible'}`}>
                        {suggestions.length > 0 && renderSuggestions()}
                    </div>
                </div>
                <div className="map-container" ref={mapContainer} />
            </div>
        </div>
    );
};

export default MapComponent;

