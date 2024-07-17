import React, { useContext, useState } from "react";
import { MensajeError } from '../../../../context/MensajeError';
import axios from 'axios';
import CardIngresos from "./CardIngresos/CardIngresos";
import { v4 as uuidv4 } from 'uuid';


const SearchIngresos = () => {
  const { error, updateError } = useContext(MensajeError);
  const [ingresoID, setIngresoID] = useState('');
  const [ingresosList, setIngresosList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('https://data-geri.onrender.com/api/ingresos', {
        params: { historia_clinica: ingresoID, limit: 10, offset: 0 }
      });
      const allIngresos = res.data;
      setIngresosList(allIngresos);
      updateError(''); 
    } catch (err) {
      console.error('Error al traer los ingresos de la base de datos', err);
      setIngresosList([]); 
      updateError('Error al traer los ingresos de la base de datos. Inténtalo de nuevo.');
    }
    setIngresoID('');
  };

  const renderIngresos = () =>
    ingresosList.map((item, i) => (
      <CardIngresos
        key={uuidv4()}
        ingreso_id={item.ingreso_id}
        medico={item.medico_id}
        historia={item.historia_clinica}
        nombre={item.nombre_paciente}
        apellido={item.apellido_paciente}
        sexo={item.sexo}
        edad={item.edad_paciente}
        fecha_ingreso={item.fecha_ingreso}
        fecha_alta={item.fecha_alta}
        duracion_ingreso={item.duracion_ingreso}
        diagnostico={item.diagnostico_principal}
        barthel={item.barthel_basal}
      />
    ));

  return (
    <article className='search-ingresos'>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="ingreso"
          id="ingreso"
          placeholder='Búsqueda por nº de historia'
          value={ingresoID}
          onChange={(e) => setIngresoID(e.target.value)}
        />
        <button className="button-search" type="submit">Buscar</button>
      </form>
      {error && <p>{error}</p>}
      {ingresosList.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Ingreso ID</th>
              <th>Médico</th>
              <th>Historia Clínica</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Sexo</th>
              <th>Edad</th>
              <th>Fecha Ingreso</th>
              <th>Fecha Alta</th>
              <th>Duración Ingreso</th>
              <th>Diagnóstico principal</th>
              <th>Barthel Ingreso</th>
            </tr>
          </thead>
          <tbody>
            {renderIngresos()}
          </tbody>
        </table>
      ) : (
        <p>No se han buscado ingresos.</p>
      )}
    </article>
  );
};

export default SearchIngresos;