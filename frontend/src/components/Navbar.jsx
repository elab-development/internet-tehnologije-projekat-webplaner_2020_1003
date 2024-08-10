import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

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
  const handleLogout = () => {
  
    sessionStorage.clear();
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
            <NavItem>
              <NavLink to="/planeri">Planeri</NavLink>
            </NavItem>
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
