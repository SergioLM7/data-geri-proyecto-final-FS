import React from "react";

const NavUser = ({handleLogout}) => {
  return <nav className="nav">
    <label htmlFor="menu"></label>
    <ul>
      <li>
        Home
      </li>
      <li>
        Mi perfil
      </li>
      <li>
        Mis ingresos
      </li>
      <li>
        Mis stats
      </li>
      <li>
        Usuarios
      </li>
      <li onClick={handleLogout}>Log out</li>
    </ul>
  </nav>
};

export default NavUser;
