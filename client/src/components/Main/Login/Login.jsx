import React, { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../Header/Header';
import { MensajeError } from '../../../context/MensajeError';
import { DNA } from 'react-loader-spinner';



const Login = ({ handleLogin, handleLogout }) => {
  const { error, setError } = useContext(MensajeError);

  const [email, setEmail] = useState('');
  const [password_hash, setPasswordHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://data-geri.onrender.com/api/medicos/login/', {
        email: email,
        password_hash: password_hash
      });
   
      const token = response.data;
      handleLogin(token);
      setError(null);
      setIsLoading(false);
      navigate('/home');
    } catch (error) {
      console.log(error)
      const mensaje = error.response && error.response.data.message
        ? error.response.data.message
        : 'Error al iniciar sesión. Inténtalo de nuevo';
      setIsLoading(false);
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
      {isLoading ? (
        <DNA
          visible={true}
          height="100"
          width="100"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      ) : (<div className="link-register">
        <Link to="/register">¿No estás registrado? Haz click aquí</Link>
      </div>)}
    </section>
  </>;
};

export default Login;
