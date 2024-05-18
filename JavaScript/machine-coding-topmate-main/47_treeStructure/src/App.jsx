import React from 'react';

const Component = () => {
  const exampleObj = {
    taxi: 'a car licensed to transport passengers in return for payment of a fare',
    food: {
      sushi:
        'a traditional Japanese dish of prepared rice accompanied by seafood and vegetables',
      apple: {
        Honeycrisp:
          'an apple cultivar developed at the MAES Horticultural Research Center',
        Fuji: 'an apple cultivar developed by growers at Tohoku Research Station',
      },
    },
  };

  const treeStructure = (object = {}) => (
    <div className='tree-container'>
      {Object.keys(object).map((ele) => (
        <>
          {typeof object[ele] === 'string' && (
            <span className='tree-label'>
              {ele}: {object[ele]}
            </span>
          )}
          <br></br>
          {typeof object[ele] === 'object' && (
            <>
              <div className='tree-nestedobject'>{ele}:</div>
              {treeStructure(object[ele])}
            </>
          )}
        </>
      ))}
    </div>
  );
  return <div className='main'>{treeStructure(exampleObj)}</div>;
};

export default Component;
