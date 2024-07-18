import React, { useState, useEffect } from "react";
import Login from './Login/Login';
import HomeUser from './HomeUser/HomeUser';
import RegisterUser from "./RegisterUser";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
axios.defaults.withCredentials = true;



const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('access-token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    Cookies.set('access-token', token, {
      expires: 1 / 24,
      path: '/',
      domain: 'localhost' // Asegúrate de que el dominio está correcto
    });
  };

  const handleLogout = async () => {
    const token = Cookies.get('access-token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const email = decodedToken.email;
        const date = new Date();
  
        const response = await axios.post('https://data-geri.onrender.com/api/medicos/logout/', {
          email: email,
          is_logged: false,
          last_time_logged: date
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log(response);
        Cookies.remove('access-token');
        setIsLoggedIn(false);
        navigate('/');
      } catch (error) {
        console.error('Error al hacer logout:', error);
        // Considera manejar el error de una manera más amigable para el usuario
      }
    } else {
      console.error('No se encontró el token de acceso.');
    }
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
