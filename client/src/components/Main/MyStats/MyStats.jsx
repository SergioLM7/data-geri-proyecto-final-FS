import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { MensajeError } from '../../../context/MensajeError';
import { DNA } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const MyStats = () => {
  const { error, setError } = useContext(MensajeError);
  const [myStats, setMyStats] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    getStats();
  }, []);

  const getEmailCookies = () => {
    const token = Cookies.get('access-token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken)
        return decodedToken.email;
      } catch (err) {
        console.error('Error al decodificar el token', err);
        setError('Error al obtener el email del usuario.');
        return null;
      }
    }
    setError('No se encontró el token de autenticación.');
    return null;
  };

  const getStats = async () => {
    setSearching(true);
    const email = getEmailCookies();
    if (!email) {
      setSearching(false);
      return;
    }

    try {
      const res = await axios.get(`https://data-geri.onrender.com/api/stats/${email}`);
      console.log(res);
      //setMyStats(res.data);
      setError('');
    } catch (err) {
      console.error('Error al traer las estadísticas de la base de datos', err);
      setMyStats([]);
      setError('Error al traer las estadísticas de la base de datos. Inténtalo de nuevo.');
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setSearching(false);
    }
  };

  const formatNumber = (num) => {
    return parseFloat(num).toFixed(2);
  };

  return (
    <section>
      <h2>My Stats</h2>
      {searching ? (
        <DNA
          visible={true}
          height="150"
          width="150"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      ) : (
        <article className="stats-user">
          {myStats.length > 0 ? (
             <ul>
             <li>Edad media: {formatNumber(myStats.edadmedia)} años</li>
             <li>Estancia media: {formatNumber(myStats.estanciamedia)} días</li>
             <li>Total ingresos: {myStats.totalingresos}</li>
             <li>Porcentaje de hombres: {formatNumber(myStats.porcentajehombres)}%</li>
             <li>Porcentaje de mujeres: {formatNumber(myStats.porcentajemujeres)}%</li>
             <li>Porcentaje ITU: {formatNumber(myStats.porcentajeitu)}%</li>
             <li>Porcentaje neumonía: {formatNumber(myStats.porcentajeneumonia)}%</li>
             <li>Porcentaje ICC: {formatNumber(myStats.porcentajeicc)}%</li>
             <li>Porcentaje infección abdominal: {formatNumber(myStats.porcentajeinfeccabd)}%</li>
             <li>Porcentaje otros: {formatNumber(myStats.porcentajeotro)}%</li>
           </ul>
          ) : (
            <p>No hay estadísticas disponibles.</p>
          )}
        </article>
      )}
      {error && <p className="error-message">{error}</p>}
    </section>
  );
};

export default MyStats;
