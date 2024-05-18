import useToggle from './customHooks/useToggle';
import './App.css'

const App = () => {
  const [toggleState, toggleFunc] = useToggle();

  return (
    <div className='app_container'>
      <button className="toggle_btn"onClick={toggleFunc}>{toggleState ? 'ON' : 'OFF'}</button>
    </div>
  );
};

export default App;
