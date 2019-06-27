import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <ul className="nav-bar">
    <li className="navbar-items">
      <Link to="/">Home</Link>
    </li>
    <li className="navbar-items">
      <Link to="/houses">Houses</Link>
    </li>
  </ul>
);
export default NavBar;
