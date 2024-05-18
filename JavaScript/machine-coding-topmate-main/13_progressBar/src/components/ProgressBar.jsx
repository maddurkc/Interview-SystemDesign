import { useState, useEffect } from 'react';
import '../components/ProgressBar.css';

export default function Progressbar() {
  const [filled, setFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    // we are continuously checking if filled is 100 or not, if it is less than 100 then it keeps on running
    if (filled < 100 && isRunning) {
      const id = setTimeout(() => setFilled((prev) => prev + 2), 250);
      setTimeoutId(id);
      //  if filled is 100, just stop the +2 logic and simply make the state false
    } else if (filled === 100) {
      // Optionally handle completion here
      setIsRunning(false);
    }
    return () => clearTimeout(timeoutId);
  }, [filled, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    //clearing the timeout we are setting as part of the setTimeout
    clearTimeout(timeoutId);
    setFilled(0);
    setIsRunning(false);
  };

  return (
    <div>
      {/* progress bar div */}
      <div className='progressbar'>
        <div
          className={`progressbar-filled ${isRunning ? 'is-running' : ''}`}
          //ex: style="width: 98%"
          style={{ width: `${filled}%` }}
        ></div>
        <span className='progressPercent'>{filled}%</span>
      </div>

      {/* buttons */}
      <button className='btn' onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button className='btn' onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
      <button className='btn' onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
