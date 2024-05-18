import { useState, useCallback } from 'react';
import AccordionItem from './Accordion';
import data from './data';
import './App.css';

const App = () => {
  // state to maintain checkbox
  const [allowMultipleOpen, setAllowMultipleOpen] = useState(true);
  // state to maintain the active/opened accordions
  const [activeAccordions, setActiveAccordions] = useState(new Set());

  const handleCheckboxChange = useCallback(() => {
    //below state is to simply toggle the checkbox (checked/un-checked)
    setAllowMultipleOpen((prev) => !prev);
  }, []);

  //below function is to toggle the accordion component itself,
  // this function runs every time you toggle the checkbox
  const toggleAccordion = useCallback(
    (id) => {
      //activeAccordions means the ones that were opened
      setActiveAccordions((prev) => {
        //at first, we are storing them in the Set
        const updatedActiveAccordions = new Set(prev);
        //if the id of the accordion you are going to click now is already in opened ?
        if (updatedActiveAccordions.has(id)) {
          // if yes, then delete that id from that set stored (which means, the accordion is going to be closed)
          updatedActiveAccordions.delete(id);
        } else {
          // if it is not allowed to keep multiple accordions opened then on click of any accordion, at first we are closing all the opened ones
          if (!allowMultipleOpen) {
            // simply maintain an empty set by clearing everything (this helps us to close everything that is opened only when checkbox is unchecked)
            updatedActiveAccordions.clear();
          }
          // then as the click happened, post all clear we  are adding that particular clicked accordion and we will be showing only one in this case.
          updatedActiveAccordions.add(id);
        }
        // returning the set
        return updatedActiveAccordions;
      });
    },
    [allowMultipleOpen]
  );

  return (
    <div className='app-container'>
      <div className='checkboxContainer'>
        <label className='checkboxLabel' htmlFor='multiple-open'>
          Allow multiple accordions open?
        </label>
        <input
          type='checkbox'
          id='multiple-open'
          checked={allowMultipleOpen}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className='content-info'>
        {data.map((item) => (
          <AccordionItem
            key={item.id}
            //below line of `.has` helps us to toggle the info
            isActive={activeAccordions.has(item.id)}
            toggleAccordion={toggleAccordion}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
