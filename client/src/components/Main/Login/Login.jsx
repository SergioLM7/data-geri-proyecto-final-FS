import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header/Header';


const Login = ({ setAuth }) => {

  const [email, setEmail] = useState('');
  const [password_hash, setPasswordHash] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email);
    try {
      const response = await axios.get('https://data-geri.onrender.com/api/medicos',  {
        params: { email: email }
      });
      console.log(response);

      if (response.data.email === email && response.data.password_hash === password_hash) {
        //setAuth(true);
        console.log('Usuario y contraseña correctos')
        setError('Usuario y contraseña correctos');
        navigate('/home'); 
      } else {
        setError('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Inténtalo de nuevo');
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password_hash}
            onChange={(e) => setPasswordHash(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" className="button-login">Iniciar sesión</button>
      </form>
    </section>
    </>;
};

export default Login;
