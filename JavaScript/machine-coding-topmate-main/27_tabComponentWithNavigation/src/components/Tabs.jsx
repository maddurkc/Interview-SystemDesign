import { useState } from 'react';
import Tab from './Tab';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const content = {
    1: 'Content for tab 1',
    2: 'Content for tab 2',
    3: 'Content for tab 3',
  };
  return (
    <div className='container'>
      <div className='tabs-container'>
        <div className='tabs-header'>
          <Tab
            label='Tab 1'
            id={1}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <Tab
            label='Tab 2'
            id={2}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <Tab
            label='Tab 3'
            id={3}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div tabIndex={-1} className='tab-content'>
          {content[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
