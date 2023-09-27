import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './NavBar';
import Tasks from './task/Task.jsx';
import Calendar from './calendar/Calendar.jsx';
import Auth from './loginpage/Login&signup.jsx';
import Profile from './Profile/Profile.jsx';

function App() {
  

  return (
    <div>
      <Routes>
        <Route index element={<Auth />} />
        <Route path="/" element={<Navbar />}>
          <Route path="/task" element={<Tasks />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/loginpage" element={<Auth />} />
      </Routes>
      
    </div>
  );
}

export default App;
