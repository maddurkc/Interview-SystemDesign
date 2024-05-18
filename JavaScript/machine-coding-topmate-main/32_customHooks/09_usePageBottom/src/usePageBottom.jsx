import { useState, useEffect } from 'react';

const usePageBottom = () => {
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const offsetHeight = document.documentElement.offsetHeight;
    const innerHeight = window.innerHeight;
    const atBottom = scrollTop + innerHeight >= offsetHeight;

    setIsBottom(atBottom);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isBottom;
};

export default usePageBottom;
