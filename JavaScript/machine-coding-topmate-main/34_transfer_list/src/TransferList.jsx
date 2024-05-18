import { useState } from 'react';
import { data } from './data';

const TransferList = () => {
  const [listA, setListA] = useState(data);
  const [listB, setListB] = useState([]);

  const handleChange = (id, listName) => {
    const setList = listName === 'A' ? setListA : setListB;
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const transfer = (sourceList, setSource, setDestination) => {
    const toTransfer = sourceList
      .filter((item) => item.checked)
      .map((mappedItem) => ({ ...mappedItem, checked: false }));
    setDestination((dest) => dest.concat(toTransfer));
    setSource((source) => source.filter((item) => !item.checked));
  };

  const ListComponent = ({ listData, listType }) => (
    <div className='list-box'>
      <h3>{`List ${listType}`}</h3>
      <ul>
        {listData.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type='checkbox'
                onChange={() => handleChange(item.id, listType)}
                checked={item.checked}
              />
              {item.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className='transfer-list'>
      <ListComponent listData={listA} listType='A' />
      <div className='transfer-controls'>
        <button onClick={() => transfer(listA, setListA, setListB)}>&gt;</button>
        <button onClick={() => transfer(listB, setListB, setListA)}>&lt;</button>
      </div>
      <ListComponent listData={listB} listType='B' />
    </div>
  );
};

export default TransferList;
