import React, { useState, useEffect } from "react";
import Login from './Login/Login';
import HomeUser from './HomeUser/HomeUser';
import RegisterUser from "./RegisterUser";
import MyStats from "./MyStats/MyStats";
import StatsGenerales from "./StatsGenerales/StatsGenerales";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
axios.defaults.withCredentials = true;



const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('access-token') || localStorage.getItem('access-token');
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      Cookies.remove('access-token');
      localStorage.removeItem('access-token');
      setIsLoggedIn(false);
      navigate('/');
    }

    if (token) {
      setIsLoggedIn(true);
      navigate('/home');
    }
  }, []);

  const handleLogin = (token) => {
    Cookies.set('access-token', token, {
      expires: 1 / 24,
      path: '/',
      secure: true,
      sameSite: 'None'
    });
    localStorage.setItem('access-token', token);
    alert(Cookies.get('access-token'));
    alert(localStorage);

    setIsLoggedIn(true);

  };

  const handleLogout = async () => {
    const token = Cookies.get('access-token') || localStorage.getItem('access-token');
    if (token) {
      try {
        const response = await axios.put('https://data-geri.onrender.com/api/medicos/logout/', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          Cookies.remove('access-token');
          localStorage.removeItem('access-token');
          setIsLoggedIn(false);
          navigate('/');
        } else {
          console.error('Error en la respuesta del servidor:', response);
          Cookies.remove('access-token');
          localStorage.removeItem('access-token');
        }
      } catch (error) {
        console.error('Error al hacer logout:', error);
        Cookies.remove('access-token');
        localStorage.removeItem('access-token');
        navigate('/');

      }
    }
  };

  return (
    <main className="main">
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
          path="/stats"
          element={isLoggedIn ? <StatsGenerales handleLogout={handleLogout} /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={<RegisterUser />}
        />
        <Route
          path="/jsondocs"
          element={<Navigate to={'/jsondocs'} />}
        />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
    </main>
  );

};

export default Main;
