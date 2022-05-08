import logo from './logo.svg';
import './App.css';
import Modules from './pages/Modules';
import Timetable from './pages/Timetable';
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
    name:'Timetable',
    content:<Timetable />
  },
]

function App() {
  return (
    <div className="App">
      <PersistentDrawerLeft>
        <BasicTabs children={children}/>
      </PersistentDrawerLeft>
    </div>
  );
}

export default App;
