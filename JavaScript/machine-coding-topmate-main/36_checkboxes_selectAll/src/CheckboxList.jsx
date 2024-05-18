import React, { useState } from 'react';

const CheckboxList = () => {
  // Initial state of checkboxes
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, checked: false, color: 'blue' },
    { id: 2, checked: false, color: 'yellow' },
    { id: 3, checked: false, color: 'red' },
  ]);
  const [parentChecked, setParentChecked] = useState(false);

  // Handle change for parent checkbox
  const handleParentChange = (e) => {
    const checked = e.target.checked;
    setParentChecked(checked);
    setCheckboxes(checkboxes.map((checkbox) => ({ ...checkbox, checked })));
  };

  // Handle change for child checkboxes
  const handleChildChange = (id) => (e) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id ? { ...checkbox, checked: e.target.checked } : checkbox
    );
    setCheckboxes(updatedCheckboxes);

    // Check if all child checkboxes are checked
    setParentChecked(updatedCheckboxes.every((checkbox) => checkbox.checked));
  };

  return (
    <div className='container'>
      <label className='checkbox parent-checkbox'>
        <input
          type='checkbox'
          checked={parentChecked}
          onChange={handleParentChange}
        />
        <span className='checkmark'></span>
        Select All
      </label>
      <div className='checkbox-group'>
        {checkboxes.map((checkbox) => (
          <label className='checkbox' key={checkbox.id}>
            <input
              type='checkbox'
              checked={checkbox.checked}
              onChange={handleChildChange(checkbox.id)}
            />
            <span className='checkmark'></span>
            {checkbox.color} {/* Assuming you have a 'color' property */}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxList;
