import './App.css';
import Form from './components/Form';
import { createContext, useState } from 'react';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className='App' id={theme}>
        {/* I'm going with the simple logic, you can uncomment if you want */}
        {/* <Form /> */}
        <div className='switch'>
          <label> {theme === 'light' ? 'Light Mode' : 'Dark Mode'}</label>
          <button
            onClick={toggleTheme}
            className={`switch-button ${
              theme === 'dark' ? 'switch-button-on' : ''
            }`}
          >
            <span className='slider'></span>
          </button>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
