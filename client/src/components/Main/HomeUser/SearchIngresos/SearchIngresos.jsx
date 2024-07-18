import React, { useContext, useState } from "react";
import { MensajeError } from '../../../../context/MensajeError';
import axios from 'axios';
import CardIngresos from "./CardIngresos/CardIngresos";
import { v4 as uuidv4 } from 'uuid';
import { DNA } from 'react-loader-spinner';



const SearchIngresos = () => {
  const { error, setError } = useContext(MensajeError);
  const [ingresoID, setIngresoID] = useState('');
  const [ingresosList, setIngresosList] = useState([]);
  const [loading, setLoading] = useState(false); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const res = await axios.get('https://data-geri.onrender.com/api/ingresos', {
        params: { historia_clinica: ingresoID, limit: 10, offset: 0 }
      });
      const allIngresos = res.data;
      setIngresosList(allIngresos);
      setError('');
    } catch (err) {
      console.error('Error al traer los ingresos de la base de datos', err);
      setIngresosList([]);
      setError('Error al traer los ingresos de la base de datos. Inténtalo de nuevo.');
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setLoading(false);
    }
    setIngresoID('');
  };

  const handleDelete = (deletedId) => {
    setIngresosList(ingresosList.filter(item => item.ingreso_id !== deletedId));
  };

  const handleEdit = (updatedIngreso) => {
    setIngresosList((prevList) =>
      prevList.map((ingreso) =>
        ingreso.ingreso_id === updatedIngreso.ingreso_id ? updatedIngreso : ingreso
      )
    );
  };

  const renderIngresos = () =>
    ingresosList.map((item, i) => (
      <CardIngresos
        key={uuidv4()}
        ingreso_id={item.ingreso_id}
        medico_id={item.medico_id}
        historia_clinica={item.historia_clinica}
        nombre_paciente={item.nombre_paciente}
        apellido_paciente={item.apellido_paciente}
        sexo={item.sexo}
        edad_paciente={item.edad_paciente}
        fecha_ingreso={item.fecha_ingreso}
        fecha_alta={item.fecha_alta}
        duracion_ingreso={item.duracion_ingreso}
        diagnostico_principal={item.diagnostico_principal}
        barthel_basal={item.barthel_basal}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {loading ? (
            <tr>
              <td colSpan="12">
                <DNA
                  visible={true}
                  height="100"
                  width="100"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              </td>
            </tr>
          ) : (
            ingresosList.length > 0 ? renderIngresos() : (
              <tr>
                <td colSpan="12">No se han solicitado ingresos.</td>
              </tr>
            )
          )}
          </tbody>
        </table>
      ) : (
        <p></p>
      )}
    </article>
  );
};

export default SearchIngresos;