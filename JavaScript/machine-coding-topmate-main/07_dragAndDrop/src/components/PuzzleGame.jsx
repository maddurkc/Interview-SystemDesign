import { useState } from 'react';
import './PuzzleGame.css';
import { PuzzlePiece } from './PuzzlePiece';

const initialPieces = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  url: `https://source.unsplash.com/random/200x200?pic=${i + 1}`,
}));

// main component
const PuzzleGame = () => {
  const [pieces, setPieces] = useState(initialPieces);
  const [draggedPieceId, setDraggedPieceId] = useState(null);

  const handleDragStart = (id) => {
    setDraggedPieceId(id);
  };

  const handleDrop = (id) => {
    setPieces((prevPieces) => {
      //taking a copy of the existing images array
      const newPieces = [...prevPieces];

      //draggedIndex is captured from onDragStart passed id, that passed id is the param of the handleDragStart function
      const draggedIndex = newPieces.findIndex((p) => p.id === draggedPieceId);

      //droppedIndex is captured from onDrop passed id, that passed id is nothing but the param of this handleDrop function
      const droppedIndex = newPieces.findIndex((p) => p.id === id);

      // swapping logic
      [newPieces[draggedIndex], newPieces[droppedIndex]] = [
        newPieces[droppedIndex],
        newPieces[draggedIndex],
      ];
      //don't forget to return the swapped ones
      return newPieces;
    });
    setDraggedPieceId(null);
  };

  return (
    <div className='container'>
      <div className='puzzle-container'>
        {pieces.map((piece) => (
          <PuzzlePiece
            key={piece.id}
            id={piece.id}
            url={piece.url}
            isDragging={draggedPieceId === piece.id}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          />
        ))}
      </div>
    </div>
  );
};

export default PuzzleGame;
