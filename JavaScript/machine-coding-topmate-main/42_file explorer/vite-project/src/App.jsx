import { useState } from 'react';
import Folder from './components/Folder';
import useTraverseTree from './hooks/use-traverse-tree';
import './index.css';
import explorer from './data/folderData';

export default function App() {
  // State to manage the explorer data
  const [explorerData, setExplorerData] = useState(explorer);

  // Custom hook for tree traversal and manipulation
  const { insertNode } = useTraverseTree();

  // Handler to insert a new node in the explorer data
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  // Render the Folder component with the explorer data
  return (
    <div className='App'>
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  );
}
