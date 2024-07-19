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
        Mi perfil
      </li>
      <li>
        Mis ingresos
      </li>
      <li>
      <Link to="/mystats">Mis stats</Link>
      </li>
      <li onClick={handleLogout}>Log out</li>
    </ul>
  </nav>
};

export default NavUser;
