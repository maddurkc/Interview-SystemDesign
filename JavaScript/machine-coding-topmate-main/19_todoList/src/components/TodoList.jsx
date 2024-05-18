import { useState } from 'react';
import './TodoList.css'; // Assuming you save your CSS in TodoList.css

const initialItems = [
  'JavaScript',
  'HTML',
  'CSS',
  'React',
  'Angular',
  'Zustand',
  'NextJS',
  'TypeScript',
].map((item) => ({
  id: `${item}-${Date.now()}`,
  text: item,
  isEditing: false,
}));

function TodoList() {
  const [todoItems, setTodoItems] = useState(initialItems);
  const [inputValue, setInputValue] = useState('');

  // add an single item to the existing list with isEditing: false
  const addTodoItem = (item) => {
    setTodoItems((prevItems) => [
      ...prevItems,
      { id: `${item}-${Date.now()}`, text: item, isEditing: false },
    ]);
  };

  // filter the list with the items whose index doesn't match with the id you want to delete
  const handleDelete = (id) => {
    setTodoItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Reusable function to update an item
  // const updateTodoItem = (id, updateFunction) => {
  //   setTodoItems((prevItems) =>
  //     prevItems.map((item) => (item.id === id ? updateFunction(item) : item))
  //   );
  // };

  // Handle toggling the edit state
  const handleEdit = (id) => {
    // updateTodoItem(id, (item) => ({ ...item, isEditing: !item.isEditing }));
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  // Handle changing the text of an item
  const handleEditChange = (e, id) => {
    const newValue = e.target.value;
    // updateTodoItem(id, (item) => ({ ...item, text: newValue }));
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: newValue } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      //once the value is true and clicked on enter, it will be invoking/calling the addTodoItem function with that value
      addTodoItem(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className='container text-center'>
      <form id='todoForm' onSubmit={handleSubmit}>
        <input
          type='text'
          id='todoItemInput'
          autoComplete='off'
          placeholder='Add a new item'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>

      <ul id='listContainer' className='list-container'>
        {todoItems.map((item) => (
          <li key={item.id}>
            {/* handleEdit function is responsible for isEditing toggle*/}
            {item.isEditing ? (
              <input
                type='text'
                value={item.text}
                onChange={(e) => handleEditChange(e, item.id)}
              />
            ) : (
              // for other non edited todos, it is normal text
              <span className='text'>{item.text}</span>
            )}
            <button className='edit' onClick={() => handleEdit(item.id)}>
              {item.isEditing ? '💾' : '✏️'}
            </button>
            <button className='delete' onClick={() => handleDelete(item.id)}>
              🗑️
            </button>
          </li>
        ))}
      </ul>

      {todoItems.length === 0 && (
        <div className='no-elements'>Ooops! List is empty</div>
      )}
    </div>
  );
}

export default TodoList;
