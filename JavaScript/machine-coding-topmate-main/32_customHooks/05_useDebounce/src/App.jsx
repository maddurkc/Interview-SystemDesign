import React from 'react';
import useDebounce from './customHooks/useDebounce';
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const debounceSearchValue = useDebounce(searchInputValue, 500);

  useEffect(() => {
    if (debounceSearchValue) {
      console.log(`Searching for ${debounceSearchValue}`);
    }
  }, [debounceSearchValue]);

  return (
    <div className='app_container'>
      <input
        type='text'
        onChange={(e) => setSearchInputValue(e.target.value)}
        placeholder='Please search here...'
        value={searchInputValue}
      />
    </div>
  );
};

export default App;
