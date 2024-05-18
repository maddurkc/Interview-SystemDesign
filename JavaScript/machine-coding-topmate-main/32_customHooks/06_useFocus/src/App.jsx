import React from 'react';
import useFocus from './customHooks/useFocus';

const App = () => {
  const [ref, isFocussed] = useFocus();
  return (
    <div>
      <input ref={ref} />
      <p>{isFocussed ? 'focused' : 'not focused'}</p>
    </div>
  );
};

export default App;
