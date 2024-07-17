import React, {useState} from "react";
import axios from 'axios';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password_hash, setPasswordHash] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email);
    try {
      const response = await axios.get('https://data-geri.onrender.com/api/medicos',  {
        params: { email: email }
      });
      console.log(response);
      /*if (response) {
        localStorage.setItem('token', response.data.token);
        setAuth(true);
      } else {
        setError('Usuario o contraseña incorrectos.');
      }*/
    } catch (error) {
      setError('Error al iniciar sesión. Inténtalo de nuevo');
    }
  };


  return (
    <div>
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
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
