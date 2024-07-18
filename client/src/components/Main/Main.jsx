import React, { useState, useEffect } from "react";
import Login from './Login/Login';
import HomeUser from './HomeUser/HomeUser';
import RegisterUser from "./RegisterUser";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


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
    Cookies.set('access-token', token, { expires: '1h' });
  };

  const handleLogout = async () => {
    const token = Cookies.get('access-token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const email = decodedToken.email;
        const date = new Date();
        
        // Llama al endpoint de logout del backend
        await axios.post('https://data-geri.onrender.com/api/medicos', { email, is_logged: true, last_time_logged: date}, {
          headers: { Authorization: `Bearer ${token}` }
        });

        Cookies.remove('access-token');
        setIsLoggedIn(false);
        navigate('/');
      } catch (error) {
       throw new Error ('Error al hacer logout:', error);
      }
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
