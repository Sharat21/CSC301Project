// SearchBar.js
import React, { useState } from 'react';
import './maps.css'; // Import the maps.css file

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search for a location..."
                className="search-input"
            />
            {/* Additional elements or features can be added here */}
        </div>
    );
};

export default SearchBar;
