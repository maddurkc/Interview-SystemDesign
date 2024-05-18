import { useEffect } from 'react';
import { useRef, useState } from 'react';
const useFocus = () => {
  const ref = useRef(); //defining the ref
  const [focussed, setFocussed] = useState(false);

  useEffect(() => {
    const currentElement = ref.current; //storing the current ref
    if (!currentElement) return; //return if ref does not exist

    const onFocus = () => setFocussed(true); //fn for focus
    const onBlur = () => setFocussed(false); //fn for remove focus

    currentElement.addEventListener('focus', onFocus); //when element is focussed
    currentElement.addEventListener('blur', onBlur); //when focus is removed

    return () => {
      //removing the event listeners
      currentElement.removeEventListener('focus', onFocus);
      currentElement.removeEventListener('blur', onBlur);
    };
  }); //no dependency array means useEffect will rerun on every render

  return [ref, focussed];
};
export default useFocus;
