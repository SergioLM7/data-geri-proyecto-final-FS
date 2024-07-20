import React from "react";
import { Link } from 'react-router-dom';


const Header = () => {
  return <header className="header">
    <div className="background-h1">
      <Link to="/home">
        <h1>Data Geri</h1>
      </Link>
    </div>
  </header>
};

export default Header;
