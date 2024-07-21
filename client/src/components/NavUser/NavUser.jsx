import React, { useState } from "react";
import { Link } from "react-router-dom";


const NavUser = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return <nav className={`nav ${isOpen ? 'menu-open' : ''}`}>
    <div className="hamburger" onClick={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ul>
      <li>
        <Link to="/home" onClick={toggleMenu}>Home</Link>
      </li>
      <li>
        <Link to="/mystats" onClick={toggleMenu}>Mis stats</Link>
      </li>
      <li>
        <Link to="/stats" onClick={toggleMenu}>Stats Servicio</Link>
      </li>
      <li onClick={() => { handleLogout(); toggleMenu(); }}>Log out</li>
    </ul>
  </nav>
};

export default NavUser;
