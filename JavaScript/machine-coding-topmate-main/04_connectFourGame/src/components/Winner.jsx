const Winner = ({ winner, reset }) => (
  <p className='center'>
    <span>{winner === -1 ? 'No player won!' : `Player ${winner} won!`}</span>
    <br />
    <br />
    <button onClick={reset}>Play again?</button>
  </p>
);

export default Winner;
