import React, { useState } from 'react';

const Box = ({ isGreen, onClick }) => {
  const style = {
    width: '50px',
    height: '50px',
    background: isGreen ? 'green' : 'white',
    border: '1px solid black',
    margin: '5px',
    display: 'inline-block', // To place boxes inline
  };

  return <div style={style} onClick={onClick} />;
};

const CShapeBox = () => {
  const [boxes, setBoxes] = useState(new Array(7).fill(false));
  const [clickSequence, setClickSequence] = useState([]);
  const [toggleBack, setToggleBack] = useState(false);

  const handleBoxClick = (index) => {
    setBoxes((currentBoxes) => {
      const newBoxes = [...currentBoxes];

      // If we are not in toggle-back mode, change the clicked box to green
      if (!toggleBack) {
        newBoxes[index] = !newBoxes[index];
        setClickSequence((seq) => [...seq, index]);

        // If all boxes are green, switch to toggle-back mode
        if (newBoxes.every((val) => val === true)) {
          setToggleBack(true);
        }
      } else {
        // In toggle-back mode, revert the colors in reverse click order
        const lastClickedIndex = clickSequence.pop();
        newBoxes[lastClickedIndex] = !newBoxes[lastClickedIndex];
        setClickSequence(clickSequence);

        // If all boxes are white again, reset toggle-back mode
        if (newBoxes.every((val) => val === false)) {
          setToggleBack(false);
        }
      }

      return newBoxes;
    });
  };

  return (
    <div>
      {boxes.map((isGreen, index) => (
        <Box
          key={index}
          isGreen={isGreen}
          onClick={() => handleBoxClick(index)}
        />
      ))}
    </div>
  );
};

export default CShapeBox;
