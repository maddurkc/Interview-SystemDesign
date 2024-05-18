import React, { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

const FetchPokemon = () => {
  const [totalCount, setTotalCount] = useState(null);
  const [limit, setLimit] = useState(5); // This will now dynamically increase
  const [data, setData] = useState([]);
  const [cache, setCache] = useState({});

  // Initial fetch to get total count
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}?limit=1&offset=0`);
        const result = await response.json();
        setTotalCount(result.count); // Set the total count from the API
      } catch (error) {
        console.error('Error fetching total count:', error);
      }
    };
    fetchTotalCount();
  }, []);

  // Function to fetch data
  const fetchData = useCallback(async () => {
    const url = `${API_BASE_URL}?limit=${limit}&offset=0`; // Adjusted for the correct format
    if (cache[url]) {
      setData(cache[url]);
      return;
    }
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result.results);
      // Cache the results to avoid unnecessary fetches
      setCache((prevCache) => ({ ...prevCache, [url]: result.results }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [limit, cache]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    // You might want to adjust logic here if changing limit should reset data or fetch anew
  };

  // Handle clicking "Next" by increasing limit, not changing offset
  const handleNextClick = () => {
    setLimit((prevLimit) => {
      const newLimit = prevLimit + 5;
      return newLimit > totalCount ? prevLimit : newLimit;
    });
  };

  return (
    <div>
      {totalCount && (
        <select onChange={handleLimitChange} value={limit}>
          {[...Array(Math.ceil((totalCount - 5) / 5) + 1)].map((_, index) => (
            <option key={index} value={5 + index * 5}>
              {5 + index * 5}
            </option>
          ))}
        </select>
      )}
      <ul>
        {data.map((pokemon, index) => (
          <div key={index}>
            {index + 1}. {pokemon.name}
          </div>
        ))}
      </ul>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default FetchPokemon;
