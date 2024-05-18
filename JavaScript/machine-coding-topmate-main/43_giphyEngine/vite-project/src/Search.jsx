import React, { useState } from 'react';
import GifList from './GifList'; // Import the GifList component
const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

const Search = () => {
  const [query, setQuery] = useState('');
  const [gifs, setGifs] = useState([]);

  const fetchGifs = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=25`
      );
      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchGifs}>Search</button>
      <GifList gifs={gifs} />{' '}
      {/* Render GifList component here with gifs as props */}
    </div>
  );
};

export default Search;
