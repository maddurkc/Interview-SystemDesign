import '../components/Board.css';

const Board = () => {
  const tiles = new Array(6).fill().map((_) => new Array(7).fill(''));

  return (
    <div className='board'>
      {tiles.map((row, i) => row.map((_, j) => <div key={i + '-' + j} />))}
    </div>
  );
};

export default Board;
