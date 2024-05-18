import PropTypes from 'prop-types';

export const PuzzlePiece = ({
  id,
  url,
  isDragging,
  onDragStart,
  onDrop,
  onDragOver,
}) => (
  <div
    className={`piece ${isDragging ? 'dragging' : ''}`}
    draggable='true'
    onDragStart={() => onDragStart(id)}
    onDrop={() => onDrop(id)}
    onDragOver={onDragOver}
  >
    <img src={url} alt={`Piece ${id}`} />
  </div>
);

PuzzlePiece.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
};
