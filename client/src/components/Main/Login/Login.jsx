import React, { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../Header/Header';
import { MensajeError } from '../../../context/MensajeError';


const Login = ({ handleLogin, handleLogout }) => {
  const { error, setError } = useContext(MensajeError);

  const [email, setEmail] = useState('');
  const [password_hash, setPasswordHash] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email);
    try {
      const response = await axios.get('https://data-geri.onrender.com/api/medicos', {
        params: { email: email }
      });
      console.log(response);

      if (response.data.is_active === false) {
        const mensaje = 'Este usuario ya no está activo.'
        setError(mensaje);
      } else if (response.data.email === email && response.data.password_hash === password_hash) {
        console.log('Usuario y contraseña correctos');
        const mensaje = 'Usuario y contraseña correctos';
        setError(mensaje);
        handleLogin();
        navigate('/home');
        setError(null);
      } else {
        const mensaje = 'Usuario o contraseña incorrectos.';
        setError(mensaje);
      }
    } catch (error) {
      const mensaje = 'Error al iniciar sesión. Inténtalo de nuevo';
      setError(mensaje);
    }
  };


  return <>
    <Header />
    <section className="form-section">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login">
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            name='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name='password_hash'
            id='password_hash'
            value={password_hash}
            onChange={(e) => setPasswordHash(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" className="button-login">Iniciar sesión</button>
      </form>
      <div className="link-register">
        <Link to="/register">¿No estás registrado? Haz click aquí</Link>
      </div>
    </section>
  </>;
};

export default Login;
