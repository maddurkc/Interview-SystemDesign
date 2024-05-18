import { useState, useEffect } from 'react';
import '../components/Timer.css';

function Timer() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let interval = null;

    //if timer is active, then if condition is true (ex: after click on start button)
    if (timerActive && (hour > 0 || minute > 0 || second > 0)) {
      interval = setInterval(() => {
        //second will be 59 and (59 > 0) will be true
        // if condition will keep on running till it becomes 0
        if (second > 0) {
          // from 59 seconds it keeps on decrementing
          setSecond((seconds) => seconds - 1);
          //minute will be 59 and (59 > 0) will be true
        } else if (minute > 0) {
          // from 59 minutes it keeps on decrementing
          setMinute((minutes) => minutes - 1);
          // we are setting the state of the second to 59
          setSecond(59);
        } else if (hour > 0) {
          // any number can be provided in hour, which is greater than 0 (Ex: 9, will be come (9-1) i.e 8: 59: 59)
          setHour((hours) => hours - 1);
          //for hour, we are setting both the states to 59 (minute, second)
          setMinute(59);
          setSecond(59);
        }
      }, 1000);
    } else if (!timerActive && interval !== null) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerActive, hour, minute, second]);

  const startTimer = () => {
    if (hour === 0 && minute === 0 && second === 0) {
      // Set a message if all values are zero
      setMessage('Please provide some value for the timer.');
    } else {
      setTimerActive(true);
      setMessage(''); // Clear the message if timer is started
    }
  };

  const pauseTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    setHour(0);
    setMinute(0);
    setSecond(0);
    setTimerActive(false);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  return (
    <div className='container'>
      <span className='container__title'>Countdown Timer</span>

      <div className='container__inputs'>
        <input
          type='number'
          value={formatTime(hour)}
          onChange={(e) =>
            setHour(Math.max(0, Math.min(23, parseInt(e.target.value))))
          }
          className='container__inputs--time'
        />
        <p className='container__inputs--colon'>:</p>
        <input
          type='number'
          value={formatTime(minute)}
          onChange={(e) =>
            setMinute(Math.max(0, Math.min(59, parseInt(e.target.value))))
          }
          className='container__inputs--time'
        />
        <p className='container__inputs--colon'>:</p>
        <input
          type='number'
          value={formatTime(second)}
          onChange={(e) =>
            setSecond(Math.max(0, Math.min(59, parseInt(e.target.value))))
          }
          className='container__inputs--time'
        />
      </div>
      <div className='container__btns'>
        {!timerActive ? (
          <button className='btn start' onClick={startTimer}>
            Start
          </button>
        ) : (
          <button className='btn stop' onClick={pauseTimer}>
            Pause
          </button>
        )}
        <button className='btn reset' onClick={resetTimer}>
          Reset
        </button>
      </div>
      {message && <div className='container__message'>{message}</div>}
    </div>
  );
}

export default Timer;
