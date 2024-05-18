import React, { useState } from 'react';
import '../App.css'

const Calculator = () => {
  const [input, setInput] = useState('0');
  const [previousInput, setPreviousInput] = useState(null);
  const [operator, setOperator] = useState(null);

  const handleDigit = (digit) => {
    setInput(input === '0' ? String(digit) : input + digit);
  };

  const handleOperation = (op) => {
    if (input === '0' && op === '-') {
      setInput('-');
    } else {
      setPreviousInput(input);
      setOperator(op);
      setInput('0');
    }
  };

  const calculateResult = () => {
    if (operator && previousInput) {
      const currentInput = parseFloat(input);
      const previous = parseFloat(previousInput);
      let result = 0;

      switch (operator) {
        case '+':
          result = previous + currentInput;
          break;
        case '-':
          result = previous - currentInput;
          break;
        case '*':
          result = previous * currentInput;
          break;
        case '/':
          result = previous / currentInput;
          break;
        case '%':
          result = (previous * currentInput) / 100;
          break;
        default:
          return;
      }

      setInput(String(result));
      setPreviousInput(null);
      setOperator(null);
    }
  };

  const handleNegation = () => {
    setInput(input.charAt(0) === '-' ? input.substr(1) : '-' + input);
  };

  const clearAll = () => {
    setInput('0');
    setPreviousInput(null);
    setOperator(null);
  };

  return (
    <div className='calculator'>
      <div className='display'>{input}</div>
      <div className='buttons'>
        <button onClick={() => clearAll()}>AC</button>
        <button onClick={() => handleNegation()}>+/-</button>
        <button onClick={() => handleOperation('%')}>%</button>
        <button onClick={() => handleOperation('/')}>÷</button>
        <button onClick={() => handleDigit(7)}>7</button>
        <button onClick={() => handleDigit(8)}>8</button>
        <button onClick={() => handleDigit(9)}>9</button>
        <button onClick={() => handleOperation('*')}>×</button>
        <button onClick={() => handleDigit(4)}>4</button>
        <button onClick={() => handleDigit(5)}>5</button>
        <button onClick={() => handleDigit(6)}>6</button>
        <button onClick={() => handleOperation('-')}>-</button>
        <button onClick={() => handleDigit(1)}>1</button>
        <button onClick={() => handleDigit(2)}>2</button>
        <button onClick={() => handleDigit(3)}>3</button>
        <button onClick={() => handleOperation('+')}>+</button>
        <button onClick={() => handleDigit(0)}>0</button>
        <button onClick={() => handleDigit('.')}>.</button>
        <button onClick={() => calculateResult()}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
