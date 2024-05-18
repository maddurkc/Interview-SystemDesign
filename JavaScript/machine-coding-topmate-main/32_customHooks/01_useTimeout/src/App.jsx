import { useState } from 'react';
import useTimeout from '../src/customHooks/useTimeout';
import './App.css'; // Import the CSS file

const App = () => {
  const [message, setMessage] = useState('Waiting for timeout...');

  useTimeout(() => {
    setMessage('Timeout completed!');
  }, 5000);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};
export default App;
