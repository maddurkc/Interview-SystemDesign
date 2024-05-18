import useClickOutside from './customHooks/useClickOutside';
import { useState } from 'react';

const App = () => {
  const [open, setOpen] = useState(false);
  const outsideClickRef = useClickOutside(() => {
    //core logic is to make false
    setOpen(false);
  });
  const listStyles = {
    display: open ? 'block' : 'none',
  };

  const styles = {
    width: '120px',
    height: '200px',
    border: '2px dashed red',
  };
  return (
    <div style={styles}>
      <section ref={outsideClickRef}>
        <h3 onClick={() => setOpen(true)}>Click to see menu</h3>
        <ul style={listStyles}>
          <li>menu1</li>
          <li>menu2</li>
          <li>menu3</li>
          <p onClick={() => setOpen(false)}>Close X</p>
        </ul>
      </section>
    </div>
  );
};

export default App;
