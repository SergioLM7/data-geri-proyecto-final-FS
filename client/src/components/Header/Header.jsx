import React from "react";
import { Link } from 'react-router-dom';


const Header = () => {
  return <header className="header">
      <Link to="/home">
        <h1>Data Geri</h1>
      </Link>
  </header>
};

export default Header;
