import React, { useState } from 'react';
import './App.css'; // Make sure you have an App.css file with the required styles

function App() {
  const [passwordLength, setPasswordLength] = useState(7);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+{}:"<>?|[];\',./`~';
    let chars = '';

    if (includeUppercase) chars += uppercaseChars;
    if (includeLowercase) chars += lowercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    // if all the 4 checkboxes are selected then your chars looks like below (all 4 are added)
    // "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}:"<>?|[];',./`~"

    if (chars.length === 0) {
      alert('Please select at least one character type.');
      return;
    }

    let generatedPassword = '';
    //ex: passwordLength is 20
    for (let i = 0; i < passwordLength; i++) {
      // chars.charAt requires index, and this loop runs from 0 to 19, so for each loop a random character is picked from 91 digits lets say (ex: loop 0, index 10 in random, loop 19, index 1 in random ... so total of 20 digit password is formed from 91 digits)
      generatedPassword += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setPassword(generatedPassword);
  };

  return (
    <div className='password-generator'>
      <div className='slider-container'>
        <label>
          Character Length
          <input
            type='range'
            min='1'
            max='20'
            value={passwordLength}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
          />
          <span className='slider-value'>{passwordLength}</span>
        </label>
      </div>
      <div className='options-container'>
        <label>
          <input
            type='checkbox'
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          Include Uppercase Letters
        </label>

        <label>
          <input
            type='checkbox'
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          Include Lowercase Letters
        </label>

        <label>
          <input
            type='checkbox'
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include Numbers
        </label>

        <label>
          <input
            type='checkbox'
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Include Symbols
        </label>
      </div>
      <button className='generate-btn' onClick={generatePassword}>
        Generate Password
      </button>
      <div className='password-display'>{password}</div>
    </div>
  );
}

export default App;
