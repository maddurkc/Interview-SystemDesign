// swapiService.jsx

const SWAPI_BASE_URL = 'https://swapi.dev/api';

/**
 * Fetches characters from the Star Wars API based on a search query.
 * @param {string} query - The search query.
 * @param {AbortSignal} signal - The signal to abort the request.
 * @returns {Promise} - A promise resolving to the search results.
 */
export const fetchCharacters = async (query, signal) => {
  try {
    const response = await fetch(`${SWAPI_BASE_URL}/people/?search=${query}`, {
      signal,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data from SWAPI:', error);
    throw error; // rethrow the error for further handling
  }
};
