import React, {useContext, useState, useEffect} from "react";
import { MensajeError } from '../../../../context/MensajeError';
import axios from 'axios';



const SearchIngresos = () => {

  const { error, updateError } = useContext(MensajeError);
  const [ingresoID, setIngresoID] = useState('');

  updateError('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    const searchValue = e.target.ingreso.value.trim();
    if (searchValue === '') {
      console.log('No hay ningún id a buscar')
    } else {
      setIngresoID(searchValue);
      console.log(ingresoID);

      try {
        const res = await axios.get('https://data-geri.onrender.com/api/ingresos',  {
          params: { historia_clinica: ingresoID, limit: 10, offset: 0 }
        });
        const allIngresos = res.data.results;
        console.log(allIngresos);
      } catch (e) {
        console.error('Error al traer los ingresos de la base de datos', e);
        setIngresoID(null);
      }

      e.target.ingreso.value = '';
    }
  };





  return <article className='search-ingresos'>
  <form onSubmit={handleSubmit} className="form">
    <input name="ingreso" id="ingreso" placeholder='Búsqueda por nº de historia'/>
    <button className="button-search">Buscar</button>
  </form>
  {error && <p>{error}</p>}
</article>
};

export default SearchIngresos;
