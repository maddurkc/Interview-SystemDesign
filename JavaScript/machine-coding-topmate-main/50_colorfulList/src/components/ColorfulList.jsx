import React, { useState } from 'react';

const ColorfulList = () => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#FF0000'); // Set default color to red
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    if (!text) {
      alert('Please enter some text');
      return;
    }
    setItems([...items, { text, color }]);
    setText(''); // Clear input field after adding
  };

  return (
    <div>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Type here...'
      />
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value='#FF0000'>Red</option>
        <option value='#00FF00'>Green</option>
        <option value='#0000FF'>Blue</option>
        {/* Add more color options as needed */}
      </select>
      <button onClick={handleAddItem}>Add</button>

      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ color: item.color }}>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorfulList;
