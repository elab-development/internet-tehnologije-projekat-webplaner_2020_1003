import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Pocetna from './components/Pocetna';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PlaneriPonuda from './components/PlaneriPonuda';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    sessionStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/planeri"
            element={isLoggedIn ? <PlaneriPonuda /> : <Navigate to="/login" />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
