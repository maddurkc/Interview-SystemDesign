import { useState, useCallback } from 'react';
import JSONCreator from './components/JSONCreator';

const App = () => {
  const [jsonStructure, setJsonStructure] = useState({});
  const [jsonOutput, setJsonOutput] = useState('');

  const handleDataChange = useCallback((id, key, value, children) => {
    setJsonStructure({ [key]: value, children });
  }, []);

  const handleGetJSON = () => {
    setJsonOutput(JSON.stringify(jsonStructure, null, 2));
  };

  return (
    <div className='container'>
      <JSONCreator
        id={0}
        data={jsonStructure}
        onDataChange={handleDataChange}
      />
      <button className='get-json-button' onClick={handleGetJSON}>
        Get JSON
      </button>
      <div>
        <textarea readOnly value={jsonOutput} rows='10' cols='50' />
      </div>
    </div>
  );
};

export default App;
