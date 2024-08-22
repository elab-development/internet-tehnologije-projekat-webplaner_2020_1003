import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Pocetna from './components/Pocetna';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PlaneriPonuda from './components/PlaneriPonuda';
import AdminPanel from './components/AdminPanel';
import AdminCategories from './components/AdminCategories';
import FAQ from './components/FAQ';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('token'));

   useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={<FAQ />} />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/planeri"
            element={isLoggedIn ? <PlaneriPonuda /> : <Navigate to="/login" />}
          />
          <Route path="/admin" element={isLoggedIn    ? <AdminPanel /> : <Navigate to="/login" />} />
          <Route path="/adminCategories" element={isLoggedIn    ? <AdminCategories /> : <Navigate to="/login" />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
