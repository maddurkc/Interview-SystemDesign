import React from 'react';
import './App.css'

// Functional component to display the list
const NamesList = ({ names }) => {
  // Function to group names by the first letter
  const groupNamesByLetter = (names) => {
    return names.reduce((acc, name) => {
      let firstLetter = name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [name];
      } else {
        acc[firstLetter].push(name);
      }
      return acc;
    }, {});
  };

  // Grouped names object
  const groupedNames = groupNamesByLetter(names);

  return (
    <div className='names-list'>
      {Object.keys(groupedNames).map((letter) => (
        <div key={letter}>
          <div className='letter-group'>{letter}</div>
          {groupedNames[letter].map((name) => (
            <div key={name} className='name'>
              {name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// The array of names to display
const namesArray = ['Ava', 'Anthony', 'Baddon', 'Baen', 'Caley', 'Caellum'];

// Usage of NamesList component
const App = () => {
  return (
    <div className='app-container'>
      <NamesList names={namesArray} />
    </div>
  );
};

export default App;
