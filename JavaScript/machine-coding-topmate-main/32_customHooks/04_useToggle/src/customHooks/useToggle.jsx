import {useState, useCallback } from 'react';


const useToggle = (initialState = false) => {
  const [toggleState, setToggleState] = useState(initialState);

  const toggleFunc = useCallback(() => {
    setToggleState((state) => !state);
  },[]);

  return [toggleState, toggleFunc];
};

export default useToggle;
