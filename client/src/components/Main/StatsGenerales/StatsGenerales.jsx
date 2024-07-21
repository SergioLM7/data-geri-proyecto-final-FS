import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { MensajeError } from '../../../context/MensajeError';
import Header from '../../Header/Header';
import NavUser from '../../NavUser/NavUser';
import { DNA } from 'react-loader-spinner';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';

const StatsGenerales = ({ handleLogout }) => {
  const { error, setError } = useContext(MensajeError);
  const [statsAno, setStatsAno] = useState([]);
  const [stats, setStats] = useState([]);
  const [searching, setSearching] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    getStats();
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  const isMobile = screenWidth < 640;


  const getStats = async () => {
    setSearching(true);

    try {
      const res = await axios.get(`${URL}/api/stats/statsservicio/`);
      console.log(res);

      if (res) {
        setStats([res.data[0]]);
        setError('');
        const res2 = await axios.get(`${URL}/api/stats/ultimosservicio/`);
        console.log(res2);

        if (res2) {
          setStatsAno([res2.data]);
        }
      }
      setError('');
    } catch (err) {
      console.error('Error al traer las estadísticas de la base de datos', err);
      setStats([]);
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

  const data = stats.length > 0 ? [
    {
      "id": "ITU",
      "label": "ITU",
      "value": formatNumber(stats[0].porcentajeitu),
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "Neumonía",
      "label": "Neumonía",
      "value": formatNumber(stats[0].porcentajeneumonia),
      "color": "hsl(350, 70%, 50%)"
    },
    {
      "id": "ICC",
      "label": "ICC",
      "value": formatNumber(stats[0].porcentajeicc),
      "color": "hsl(264, 70%, 50%)"
    },
    {
      "id": "Infec. intraabd.",
      "label": "Infec. intraabd.",
      "value": formatNumber(stats[0].porcentajeinfeccabd),
      "color": "hsl(122, 70%, 50%)"
    },
    {
      "id": "Otros",
      "label": "Otros",
      "value": formatNumber(stats[0].porcentajeotro),
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
    arcLinkLabel: d => `${d.id} (${d.value}%)`,
    responsive: true,
    legends: isMobile ? [] : [legendProps]
  };

  const lineChartProps = {
    data: dataBars,
    margin: isMobile
      ? { top: 20, right: 20, bottom: 40, left: 50 }
      : { top: 50, right: 20, bottom: 50, left: 60 },
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
      <h2>Estadísticas del servicio</h2>
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
          {stats.length > 0 ? (
            <>
              <div className="piechart">
                <h3>Distribución de enfermedades</h3>
                <ResponsivePie {...pieChartProps} />
              </div>
              <div className="linechart">
                <h3>Evolución duración del ingreso (2022-2024)</h3>
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

export default StatsGenerales;
