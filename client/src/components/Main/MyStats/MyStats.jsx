import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { MensajeError } from '../../../context/MensajeError';
import Header from '../../Header/Header';
import NavUser from '../../NavUser/NavUser';
import { DNA } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';



const MyStats = ({ handleLogout }) => {
  const { error, setError } = useContext(MensajeError);
  const [statsAno, setStatsAno] = useState([]);
  const [myStats, setMyStats] = useState([]);
  const [searching, setSearching] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)


  useEffect(() => {
    getStats();
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  const legendProps = screenWidth <= 460
    ? {
        anchor: 'bottom',
        direction: 'column',
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemDirection: 'left-to-right',
        itemTextColor: '#999',
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: 'circle',
      }
    : {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemDirection: 'left-to-right',
        itemTextColor: '#999',
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: 'circle',
      };

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

      if (res) {
        setMyStats([res.data[0]]);
        setError('');
        const res2 = await axios.get(`https://data-geri.onrender.com/api/stats/ultimos/${email}`);
        console.log(res2);
        //setStatsAno([res2.data]);

      }
      

      setError('');
    } catch (err) {
      console.error('Error al traer las estadísticas de la base de datos', err);
      setMyStats([]);
      setStatsAno([]);
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
      "id": "Infección-Abd",
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

  const dataBars = statsAno.length > 0 ? (statsAno.map(stat => ({
    id: stat.ano,
    color: 'hsl(224, 70%, 50%)',
    data: [
      {
        x: stat.ano.toString(),
        y: formatNumber(stat.estanciaMedia)
      }
    ]
  }))) : [];
 /*const dataBars = myStats.length > 0 ? [
  {
    "id": "Ingreso medio",
    "color": "hsl(224, 70%, 50%)",
    "data": [
      {
        "x": "2022",
        "y": 20,
      },
      {
        "x": "2023",
        "y": 15,
      },
      {
        "x": "2024",
        "y": formatNumber(myStats[0].estanciamedia),
      }
    ]
  }
] : [];*/

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
            <><ResponsivePie
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
                        id: 'ITU'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'Neumonía'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'Otros'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'ICC'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'Infección-Abd'
                    },
                    id: 'dots'
                },
            ]}
            motionConfig="molasses"
            legends={[legendProps]}
        />
        <ResponsiveLine
        data={dataBars}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2r"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Años',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Ingreso medio (días)',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        colors={{ scheme: 'blues' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
        </>
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
