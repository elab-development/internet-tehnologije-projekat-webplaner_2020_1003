import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pocetna from './components/Pocetna';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
       
        <Navbar></Navbar>
        <Routes>
          
          <Route path="/" element={<Pocetna />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
