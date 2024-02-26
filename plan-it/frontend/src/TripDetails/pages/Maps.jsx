import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './maps.css'; // Import the maps.css file
import SearchBar from './SearchBar';

const MapComponent = () => {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhcmF0MjEiLCJhIjoiY2x0MHFrZzA2MTFjZjJrbm40dHZhZGVndSJ9.O43Ja8GWOrgq286dvKnxCA';

        const newMap = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12', // Streets map style
            center: [-79.3832, 43.6532], // Toronto's center coordinates
            zoom: 12, // Adjust zoom level as needed
            attributionControl: false // Disable default attribution control

        });

        newMap.on('load', () => {
            // Disable default double-click zoom behavior
            newMap.doubleClickZoom.disable();
        });

        setMap(newMap);

        return () => newMap.remove();
    }, []);

    const handleSearch = async (query) => {
        // Implement search functionality using Mapbox Geocoding API
        // Here you can make requests to Mapbox Geocoding API to get autocomplete suggestions based on the query
        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`);
            const data = await response.json();
            setSuggestions(data.features);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        if (!map || !suggestion || !suggestion.center) return;

        let zoomLevel = 12; // Default zoom level

        if (suggestion.place_type.includes('country')) {
            zoomLevel = 12; // Zoom level for countries
        } else if (suggestion.place_type.includes('region')) {
            zoomLevel = 14; // Zoom level for provinces/states
        } else if (suggestion.place_type.includes('place')) {
            zoomLevel = 16; // Zoom level for cities/towns
        } else if (suggestion.place_type.includes('address')) {
            zoomLevel = 18; // Zoom level for specific addresses
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

    return (
        <div className="container">
        <div className="search-container">
            <SearchBar onSearch={handleSearch} />
            <div className={`${suggestions.length > 0 ? 'transition ease-in duration-300 opacity-100' : 'transition ease-out duration-300 opacity-0 invisible'}`}>
                {suggestions.length > 0 && renderSuggestions()}
            </div>
        </div>
        <div className="map-container" ref={mapContainer} />
    </div>
    );
};

export default MapComponent;
