import useHover from './customHooks/useHover';

function App() {
  const [hoverRef, isHovering] = useHover();

  return (
    <div>
      <p ref={hoverRef} style={{ color: isHovering ? 'blue' : 'black' }}>
        {isHovering
          ? "You're hovering over me!"
          : "I'm not being hovered over."}
      </p>
    </div>
  );
}

export default App;
