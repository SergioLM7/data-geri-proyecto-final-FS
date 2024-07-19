import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { MensajeError } from '../../../context/MensajeError';
import Header from '../../Header/Header';
import NavUser from '../../NavUser/NavUser';
import { DNA } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { ResponsivePie } from '@nivo/pie'


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

  const data =  myStats.length > 0 ? [
    {
      "id": "ITU",
      "label": "ITU",
      "value": formatNumber(myStats[0].porcentajeitu),
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "Neumonía",
      "label": "Neumonía",
      "value": formatNumber(myStats[0].porcentajeneumonia),
      "color": "hsl(350, 70%, 50%)"
    },
    {
      "id": "ICC",
      "label": "ICC",
      "value": formatNumber(myStats[0].porcentajeicc),
      "color": "hsl(264, 70%, 50%)"
    },
    {
      "id": "Infección-Abd.",
      "label": "Infección abd.",
      "value": formatNumber(myStats[0].porcentajeinfeccabd),
      "color": "hsl(122, 70%, 50%)"
    },
    {
      "id": "Otros",
      "label": "Otros",
      "value": formatNumber(myStats[0].porcentajeotro),
      "color": "hsl(258, 70%, 50%)"
    }
  ] : [] ;

  console.log(data)

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
        <article className="stats-user" style={{ height: '400px', width: '100%' }}>
          {myStats.length > 0 ? (
            <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'purple_blue_green' }}
            borderWidth={6}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        '0.2'
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            arcLinkLabel={d => `${d.id} (${d.value}%)`}
            responsive={true}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'itu'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'neumonia'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'otros'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'icc'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'infeccion-abd'
                    },
                    id: 'dots'
                },
            ]}
            motionConfig="molasses"
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
             /*<ul>
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
           */
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
