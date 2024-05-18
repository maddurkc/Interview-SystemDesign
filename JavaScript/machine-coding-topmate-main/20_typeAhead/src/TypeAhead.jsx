// In summary, using AbortController and signal in a typeahead implementation helps manage API requests more efficiently, ensures the accuracy of displayed results, and provides a better overall user experience.

import { useState, useEffect } from 'react';
import { fetchCharacters } from './services/swapiService';

const Typeahead = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const debounceId = setTimeout(() => {
      if (query.length > 0) {
        const controller = new AbortController();
        const signal = controller.signal;

        setLoading(true);
        fetchCharacters(query, signal)
          .then((data) => {
            setResults(data.results || []);
            setLoading(false);
          })
          .catch((error) => {
            if (error.name !== 'AbortError') {
              console.error('Fetch error:', error);
              setLoading(false);
            }
          });

        return () => controller.abort();
      } else {
        setResults([]);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(debounceId);
  }, [query]);

  return (
    <div>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search Star Wars characters'
      />
      {loading && <div>Loading...</div>}
      <ul>
        {results.map((character) => (
          <li key={character.url}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Typeahead;
