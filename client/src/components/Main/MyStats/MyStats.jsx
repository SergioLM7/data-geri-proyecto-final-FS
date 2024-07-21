import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { MensajeError } from '../../../context/MensajeError';
import Header from '../../Header/Header';
import NavUser from '../../NavUser/NavUser';
import { DNA } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
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

  const isMobile = screenWidth < 600;

  const getEmailCookies = () => {
    const token = Cookies.get('access-token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
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

        if (res2) {
          setStatsAno([res2.data]);
        }
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

  const data = myStats.length > 0 ? [
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
      "id": "Infec. intraabd.",
      "label": "Infec. intraabd.",
      "value": formatNumber(myStats[0].porcentajeinfeccabd),
      "color": "hsl(122, 70%, 50%)"
    },
    {
      "id": "Otros",
      "label": "Otros",
      "value": formatNumber(myStats[0].porcentajeotro),
      "color": "hsl(258, 70%, 50%)"
    }
  ] : [];

  const formatDataBars = (statsAno) => {
    if (statsAno.length > 0) {

      const yearsData = statsAno[0].map(stat => ({
        x: stat.ano,
        y: stat.estanciamedia === null ? 0 : formatNumber(stat.estanciamedia),
      }));
      return [
        {
          id: "Ingreso medio",
          color: "hsl(224, 70%, 50%)",
          data: yearsData
        }
      ];
    }
    return [];
  };

  const dataBars = formatDataBars(statsAno);
  const legendProps = {
    anchor: 'bottom',
    direction: 'row',
    justify: false,
    translateX: 0,
    translateY: 56,
    itemsSpacing: 0,
    itemWidth: 100,
    itemHeight: 18,
    itemDirection: 'left-to-right',
    itemTextColor: '#333333',
    itemOpacity: 3,
    symbolSize: 18,
    symbolShape: 'diamond',
  };

  const pieChartProps = {
    data: data,
    margin: isMobile
      ? { top: 20, right: 20, bottom: 20, left: 20 }
      : { top: 40, right: 80, bottom: 80, left: 80 },
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    activeOuterRadiusOffset: 8,
    colors: { scheme: 'blues' },
    borderWidth: isMobile ? 3 : 6,
    enableArcLinkLabels: isMobile ? false : true,
    arcLinkLabelsSkipAngle: 10,
    arcLinkLabelsTextColor: "#333333",
    arcLinkLabelsThickness: 2,
    arcLinkLabelsColor: { from: 'color' },
    arcLabelsSkipAngle: 10,
    arcLabelsTextColor: { from: 'color', modifiers: [['darker', 2]] },
    defs: [
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        size: 4,
        padding: 1,
        stagger: true
      }],
    arcLinkLabel: d => `${d.id} (${d.value}%)`,
    responsive: true,
    fill: [
      {
        match: {
          id: 'Otros'
        },
        id: 'dots'
      },
      {
        match: {
          id: 'Infec. intraabd.'
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
          id: 'ITU'
        },
        id: 'dots'
      },
      {
        match: {
          id: 'Neumonía'
        },
        id: 'lines'
      }
    ],
    legends: isMobile ? [] : [legendProps]
  };

  const lineChartProps = {
    data: dataBars,
    margin: isMobile
      ? { top: 20, right: 20, bottom: 40, left: 50 }
      : { top: 50, right: 110, bottom: 50, left: 60 },
    xScale: { type: 'point' },
    yScale: {
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false
    },
    yFormat: " >-.2r",
    axisBottom: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: isMobile ? -45 : 0,
      legend: 'Años',
      legendOffset: 36,
      legendPosition: 'middle',
      truncateTickAt: 0
    },
    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Ingreso medio (días)',
      legendOffset: -40,
      legendPosition: 'middle',
      truncateTickAt: 0
    },
    colors: { scheme: 'category10' },
    pointSize: isMobile ? 6 : 10,
    useMesh: true,
    legends: []
  };

  return <>
    <Header />
    <NavUser handleLogout={handleLogout} />
    <section className="stats">
      <h2>Mis estadísticas</h2>
      {searching ? (
        <div className="spinner"><DNA
          visible={true}
          height="150"
          width="150"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        /></div>
      ) : (
        <article className="stats-user">
          {myStats.length > 0 ? (
            <>
              <div className="piechart">
                <ResponsivePie {...pieChartProps} />
              </div>
              <div className="linechart">
                <ResponsiveLine {...lineChartProps} />
              </div>
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
