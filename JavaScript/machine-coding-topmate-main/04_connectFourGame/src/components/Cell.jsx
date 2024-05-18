import '../components/Cell.css';

const Cell = ({ value }) => {
  return <div className={`cell ${value}`}></div>;
};

export default Cell;
