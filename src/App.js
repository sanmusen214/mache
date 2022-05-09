import React from 'react';
import logo from './logo.svg';
import './App.css';
import Modules from './pages/Modules';
import Timeline from './pages/Timeline';
import Reminder from './pages/Reminder';
import BasicTabs from './components/TabPanel'
import PersistentDrawerLeft from './pages/LeftDrawer';


const children=[
  {
    name:'Modules',
    content:<Modules />
  },
  {
    name:'Reminder',
    content:<Reminder />
  },
  {
    name:'Timeline',
    content:<Timeline />
  },
]

function App() {



  return (
    <div className="App">
      <PersistentDrawerLeft>
        <BasicTabs 
        children={children}/>
      </PersistentDrawerLeft>
    </div>
  );
}

export default App;
