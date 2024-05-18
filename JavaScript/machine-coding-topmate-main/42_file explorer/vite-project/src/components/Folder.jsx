import { useState } from 'react';

function Folder({ handleInsertNode = () => {}, explorer }) {
  // State to manage folder expansion
  const [expand, setExpand] = useState(false);

  // State to manage visibility and type of the input field
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  // Handler to show input field for adding new folder/file
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  // Handler for adding a new folder/file
  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  // Conditional rendering based on whether the item is a folder or file
  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        {/* Folder view */}
        <div onClick={() => setExpand(!expand)} className='folder'>
          <span>📁 {explorer.name}</span>

          {/* Buttons to add new folder/file */}
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
          </div>
        </div>

        {/* Displaying contents of the folder */}
        <div style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}>
          {/* Input field for new folder/file name */}
          {showInput.visible && (
            <div className='inputContainer'>
              <span>{showInput.isFolder ? '📁' : '📄'}</span>
              <input
                type='text'
                className='inputContainer__input'
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}

          {/* Recursive rendering of Folder component for each item */}
          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                key={exp.id}
                explorer={exp}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    // Rendering a file item
    return <span className='file'>📄 {explorer.name}</span>;
  }
}

export default Folder;
