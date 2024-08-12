import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #f8f9fa;
  padding: 10px 20px;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
`;

const NavItem = styled.li`
  margin: 0 10px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;

  &:hover {
    color: #CDB4DB;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px;
  background-color: #CDB4DB;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Navbar = ({ isLoggedIn, onLogout }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const navigate = useNavigate();
  const handleLogout = async () => {
    const token = sessionStorage.getItem('token');
  
    try {
      // Pošalji POST zahtev za logout na server
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Očisti session storage nakon uspešne odjave
      sessionStorage.clear();
      
      // Navigiraj na početnu stranicu
      navigate("/");
      
      // Pozovi onLogout callback funkciju
      onLogout();
    } catch (error) {
      console.error('Error during logout:', error);
      // Moguće je dodati dodatno rukovanje greškama ovde
    }
    onLogout();
  };

  return (
    <Nav>
      <NavList>
        <NavItem>
          <NavLink to="/">Pocetna</NavLink>
        </NavItem>
        {!isLoggedIn && (
          <>
            <NavItem>
              <NavLink to="/register">Registracija</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/login">Prijava</NavLink>
            </NavItem>
          </>
        )}
        {isLoggedIn && (
          <>
            {user?.role.name === 'Administrator' && (
              <>
              <NavItem>
                <NavLink to="/admin">Admin Panel</NavLink>
              </NavItem>
               <NavItem>
                <NavLink to="/adminCategories">Admin Kategorije</NavLink>
              </NavItem></>
            )}
            {user?.role.name === 'Customer' && (
              <NavItem>
                <NavLink to="/planeri">Planeri</NavLink>
              </NavItem>
            )}
            <NavItem>
              <Button onClick={handleLogout}>Odjava</Button>
            </NavItem>
          </>
        )}
      </NavList>
    </Nav>
  );
};

export default Navbar;
