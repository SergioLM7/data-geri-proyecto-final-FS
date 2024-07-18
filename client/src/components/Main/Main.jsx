import React, { useState, useEffect } from "react";
import Login from './Login/Login';
import HomeUser from './HomeUser/HomeUser';
import RegisterUser from "./RegisterUser";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={<Login handleLogin={handleLogin} handleLogout={handleLogout} />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <HomeUser handleLogout={handleLogout} /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={<RegisterUser />}
        />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
    </main>
  );
};

export default Main;
