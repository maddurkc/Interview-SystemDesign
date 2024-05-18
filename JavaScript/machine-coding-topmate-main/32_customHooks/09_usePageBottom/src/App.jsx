import React, { useState, useEffect } from 'react';
import usePageBottom from './usePageBottom';

const MyComponent = () => {
  const [items, setItems] = useState(
    Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)
  );
  const atBottom = usePageBottom();

  const loadMoreItems = () => {
    const nextItems = Array.from(
      { length: 10 },
      (_, i) => `Item ${items.length + i + 1}`
    );
    setItems([...items, ...nextItems]);
  };

  useEffect(() => {
    if (atBottom) {
      loadMoreItems();
    }
  }, [atBottom]);

  return (
    <div>
      {items.map((item) => (
        <div
          key={item}
          style={{ margin: '10px', padding: '10px', border: '1px solid #ddd' }}
        >
          {item}
        </div>
      ))}
      {atBottom && <div>Loading more items...</div>}
    </div>
  );
};

export default MyComponent;
