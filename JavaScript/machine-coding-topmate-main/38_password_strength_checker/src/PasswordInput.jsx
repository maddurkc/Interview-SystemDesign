import React, { useState } from 'react';

function PasswordInput() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');

const evaluateStrength = (password) => {
  let score = 0;

  const rules = [
    { regex: /.{9,}/, score: 2 }, // Increase score for length > 8
    { regex: /.{13,}/, score: 2 }, // Increase score for length > 12
    { regex: /[a-z]/, score: 1 }, // Lowercase
    { regex: /[A-Z]/, score: 1 }, // Uppercase
    { regex: /[0-9]/, score: 1 }, // Digits
    { regex: /[^A-Za-z0-9]/, score: 1 }, // Special characters
    { regex: /(\d{3,})|([a-zA-Z]{3,})|(.)\1{2,}/, score: -1 }, // Penalize patterns
  ];

  rules.forEach((rule) => {
    if (rule.regex.test(password)) {
      score += rule.score;
    }
  });

  if (score <= 3) return 'Weak';
  if (score <= 5) return 'Moderate';
  return 'Strong';
};


  const handleInputChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(evaluateStrength(newPassword));
  };

  return (
    <div>
      <input
        type='text'
        value={password}
        onChange={handleInputChange}
        placeholder='Enter password'
      />
      <div className={`password-strength ${strength.toLowerCase()}`}>
        {strength}
      </div>
    </div>
  );
}

export default PasswordInput;

