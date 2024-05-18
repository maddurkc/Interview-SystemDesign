import React, { useState, useEffect } from 'react';
import MultiSelectDropdown from './MultiSelectDropdown';

const App = () => {
  // Sample data
  const data = [
    { id: 1, category: 'electronics', name: 'Laptop' },
    { id: 2, category: 'books', name: 'Novel' },
    { id: 3, category: 'electronics', name: 'Smartphone' },
    // ... other items
  ];

  const [filters, setFilters] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  const options = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'books', label: 'Books' },
    // ... other options
  ];

  // Effect to update the filtered data based on the selected filters
  useEffect(() => {
    if (filters.length === 0) {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => filters.includes(item.category)));
    }
  }, [filters]); // Re-run the effect when filters change

  const handleFilterChange = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  return (
    <div className='App'>
      <MultiSelectDropdown options={options} onChange={handleFilterChange} />
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
