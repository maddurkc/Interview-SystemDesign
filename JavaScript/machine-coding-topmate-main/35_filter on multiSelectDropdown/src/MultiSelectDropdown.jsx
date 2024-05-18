import { useState } from 'react';
import Select from 'react-select';

const MultiSelectDropdown = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState([]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    onChange(selected.map((option) => option.value));
  };

  return (
    <Select
      isMulti
      value={selectedOption}
      onChange={handleChange}
      options={options}
      className='basic-multi-select'
      classNamePrefix='select'
    />
  );
};

export default MultiSelectDropdown;
