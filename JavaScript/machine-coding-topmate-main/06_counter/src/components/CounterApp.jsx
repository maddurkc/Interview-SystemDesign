import { useState } from 'react';
import './CounterApp.css';

function CounterApp() {
  const [count, setCount] = useState(0);
  const [incrementValue, setIncrementValue] = useState(1);

  const handleIncrement = () => {
    setCount(count + Number(incrementValue));
  };

  const handleDecrement = () => {
    setCount(count - Number(incrementValue));
  };

  const handleValueChange = (e) => {
    setIncrementValue(e.target.value);
  };

  return (
    <div className='counter-app'>
      <h2>Counter: {count}</h2>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <input
        type='number'
        value={incrementValue}
        onChange={handleValueChange}
      />
    </div>
  );
}

export default CounterApp;
