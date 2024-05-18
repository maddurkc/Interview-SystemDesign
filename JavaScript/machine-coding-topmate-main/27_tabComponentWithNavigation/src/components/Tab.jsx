const Tab = ({ label, id, activeTab, setActiveTab }) => {
  const handleClick = () => {
    setActiveTab(id);
  };

  return (
    <div>
      <button onClick={handleClick} tabIndex={0} className='tab-button'>
        {label}
      </button>
    </div>
  );
};

export default Tab;
