/**
 * @author Sergio Lillo <Data Geri> 
 * @exports models
 * @memberof Models 
 */
const { getClient } = require('../config/db_sql');
const queries = require('../queries/ingresos.queries');

/**
 * Descripción: Esta función crea un ingreso en la tabla ingresos.
 * @memberof Models 
 * @method createIngreso 
 * @async
 * @param {JSON} entry - JSON con todos los campos para crear una fila de ingresos.
 * @return {Integer} Devuelve el número de rows creadas en la tabla.
 * @throws {Error} Error de consulta a la BBDD.
 */
const createIngreso = async (entry) => {
    let { medico_id, historia_clinica, nombre_paciente, apellido_paciente, sexo, edad_paciente, fecha_ingreso, fecha_alta, diagnostico_principal, barthel_basal } = entry;
    let client, result;
    try {
        client = await getClient();
        const data = await client.query(queries.createIngreso, [medico_id, historia_clinica, nombre_paciente, apellido_paciente, sexo, edad_paciente, fecha_ingreso, fecha_alta, diagnostico_principal, barthel_basal])
        result = data.rowCount;
        console.log(data);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
  };
  
  /**
 * Descripción: Esta función busca en la BBDD los ingresos de un médico en base a su email.
 * @memberof Models 
 * @method getIngresosByMedico 
 * @async
 * @param {JSON} entry - JSON con el email del médico y el offset de la paginación.
 * @return {Array} Devuelve un array de objeto con los 10 primeros ingresos relacionados con dicho médico.
 * @throws {Error} Error de consulta a la BBDD
 */
  const getIngresosByMedico = async(entry) => {
    const {email, offset} = entry;
    let client, result;
    try {
        client = await getClient();
        const data = await client.query(queries.getIngresosByMedico, [email, offset])
        result = data.rows;
        console.log(result);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
  };

  const getIngresosByHistoria = async (entry) => {


  };


  module.exports = {
    createIngreso,
    getIngresosByMedico
  }

  //PRUEBAS
  /*const newIngreso = {
    medico_id: 34, 
    historia_clinica: 4500, 
    nombre_paciente: 'Andrea', 
    apellido_paciente: 'Buenafuente', 
    sexo: 'Mujer', 
    edad_paciente: 91, 
    fecha_ingreso: '2022/07/10',
    fecha_alta: '2022/07/23', 
    diagnostico_principal: 'ITU', 
    barthel_basal: 40
  };

    createIngreso(newIngreso);
    getIngresosByMedico({email: 'carlos@barcelona.com', offset: 0})

    */