import { useEffect, useState } from 'react';
import usePrevious from './customHooks/usePrevious';

const App = () => {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  useEffect(() => {
    console.log(
      `Current count is ${count}, Previous Count is ${previousCount || 0}`
    );
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
};

export default App;
