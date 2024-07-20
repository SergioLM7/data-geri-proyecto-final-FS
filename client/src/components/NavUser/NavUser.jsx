import React from "react";
import { Link } from "react-router-dom";


const NavUser = ({handleLogout}) => {
  return <nav className="nav">
    <label htmlFor="menu"></label>
    <ul>
      <li>
       <Link to="/home">Home</Link>
      </li>
      <li>
      <Link to="/mystats">Mis stats</Link>
      </li>
      <li>
      <Link to="/stats">Stats Servicio</Link>
      </li>
      <li onClick={handleLogout}>Log out</li>
    </ul>
  </nav>
};

export default NavUser;
