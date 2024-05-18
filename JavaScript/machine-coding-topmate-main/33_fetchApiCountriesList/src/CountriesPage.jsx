// CountriesPage.js
import React, { useState, useEffect } from 'react';
import Country from './Country';

function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setCountries(data);
    };

    fetchCountries();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.capital?.[0].toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type='text'
        placeholder='Filter by capital...'
        onChange={handleFilterChange}
      />
      {filteredCountries.map((country, index) => (
        <Country
          key={index}
          name={country.name.common}
          capital={country.capital?.[0]}
        />
      ))}
    </div>
  );
}

export default CountriesPage;
