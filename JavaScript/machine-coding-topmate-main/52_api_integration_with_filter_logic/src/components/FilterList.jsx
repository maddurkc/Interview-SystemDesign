import React, { useState, useEffect } from 'react';

const FilterList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [input, setInput] = useState('');

  // Function to fetch data from the Pokémon API
  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=100'
      );
      const data = await response.json();
      setPokemons(data.results); // Set the pokemons with the fetched data
      setFilteredPokemons(data.results); // Initially display all pokemons
    } catch (error) {
      console.error('There was an error fetching the Pokémon data:', error);
    }
  };

  // useEffect to call fetchData on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handler for input change
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);

    // Filter the pokemons based on the input value
    const newFilteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPokemons(newFilteredPokemons);
  };

  return (
    <div>
      <input
        type='text'
        value={input}
        onChange={handleInputChange}
        placeholder='Filter by Pokémon name'
      />
      <ul>
        {filteredPokemons.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterList;
