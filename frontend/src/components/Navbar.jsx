import React from 'react';
import { Link } from 'react-router-dom';
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

const Navbar = () => {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <NavLink to="/">Pocetna</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/register">Registracija</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/login">Prijava</NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default Navbar;
