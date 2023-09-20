import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from 'react-router-dom';
import Hotel from './components/Hotel/Hotel';
import Guest from './components/Guest/Guest';
import Booking from './components/Booking/Booking';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Hotel/>} />
        <Route path='/Hm/hotel' element={<Hotel/>} />
        <Route path='/Hm/Guest' element={<Guest/>} />
        <Route path='/Hm/Booking' element={<Booking/>} />
      </Routes>
    </Router>
  );
}

export default App;
