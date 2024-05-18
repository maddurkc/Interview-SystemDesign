import React, { useRef } from 'react';
import { useEffect } from 'react';

const useClickOutside = (clickHandlerFunc) => {
  const ref = useRef();
  useEffect(() => {
   const handleClickOutside = (event) => {
     if (ref.current && !ref.current.contains(event.target)) {
       clickHandlerFunc();
     }
   };

    document.addEventListener('mousedown', handleClickOutside);
    // cleanup event
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return ref;
};

export default useClickOutside;
