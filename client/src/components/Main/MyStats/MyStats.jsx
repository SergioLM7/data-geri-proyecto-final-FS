import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { MensajeError } from '../../../context/MensajeError';
import Header from '../../Header/Header';
import NavUser from '../../NavUser/NavUser';
import { DNA } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const MyStats = ({ handleLogout }) => {
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
      setMyStats([res.data[0]]);
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
    return Number(parseFloat(num).toFixed(3));
  };

  return <>
    <Header />
    <NavUser handleLogout={handleLogout} />
    <section className="my-stats">
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
             <li>Edad media: {formatNumber(myStats[0].edadmedia)} años</li>
             <li>Estancia media: {formatNumber(myStats[0].estanciamedia)} días</li>
             <li>Total ingresos: {myStats[0].totalingresos}</li>
             <li>Porcentaje de hombres: {formatNumber(myStats[0].porcentajehombres)}%</li>
             <li>Porcentaje de mujeres: {formatNumber(myStats[0].porcentajemujeres)}%</li>
             <li>Porcentaje ITU: {formatNumber(myStats[0].porcentajeitu)}%</li>
             <li>Porcentaje neumonía: {formatNumber(myStats[0].porcentajeneumonia)}%</li>
             <li>Porcentaje ICC: {formatNumber(myStats[0].porcentajeicc)}%</li>
             <li>Porcentaje infección abdominal: {formatNumber(myStats[0].porcentajeinfeccabd)}%</li>
             <li>Porcentaje otros: {formatNumber(myStats[0].porcentajeotro)}%</li>
           </ul>
          ) : (
            <p>No hay estadísticas disponibles.</p>
          )}
        </article>
      )}
      {error && <p className="error-message">{error}</p>}
    </section>
    </>;
};

export default MyStats;
