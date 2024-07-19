import React, { useState, useEffect } from "react";
import Login from './Login/Login';
import HomeUser from './HomeUser/HomeUser';
import RegisterUser from "./RegisterUser";
import MyStats from "./MyStats/MyStats";
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
      expires: 1 / 24
    });
  };

  const handleLogout = async () => {
    const token = Cookies.get('access-token');
    if (token) {
      try {
        const response = await axios.put('https://data-geri.onrender.com/api/medicos/logout/', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Respuesta del servidor:', response.data);

        if (response.status === 200) {
          Cookies.remove('access-token');
          setIsLoggedIn(false);
          navigate('/');
        } else {
          console.error('Error en la respuesta del servidor:', response);
        }
      } catch (error) {
        console.error('Error al hacer logout:', error);
        // Maneja el error aquí (por ejemplo, mostrando un mensaje al usuario)
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
          path="/mystats"
          element={isLoggedIn ? <MyStats handleLogout={handleLogout} /> : <Navigate to="/" />}
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
