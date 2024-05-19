import React from 'react';
import Shop from './pages/Shop'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
