import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

const useHover = () => {
  const ref = useRef();

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const setYes = () => setIsHovering(true);
    const setNo = () => setIsHovering(false);
    element.addEventListener('mouseenter', setYes);
    element.addEventListener('mouseleave', setNo);

    return () => {
      element.removeEventListener('mouseenter', setYes);
      element.removeEventListener('mouseleave', setNo);
    };
  }, [ref.current]);

  return [ref, isHovering];
};

export default useHover;
