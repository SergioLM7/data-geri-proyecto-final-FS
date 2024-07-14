/**
 * @author Sergio Lillo <Data Geri> 
 * @exports models
 * @namespace Models.medicos 
 */

const { getClient } = require('../config/db_sql');
const queries = require('../queries/medicos.queries');

/**
 * Descripción: Esta función crea un médico/usuario en la tabla médicos
 * @memberof Models.medicos
 * @method createMedico 
 * @async
 * @param {JSON} entry - JSON con todos los campos para crear una fila de médico
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const createMedico = async (entry) => {
  let { nombre_medico, apellido_medico, email, password_hash, id_colegiado } = entry;
  let client, result;
  let rol = 'user';
  let is_active = true;
  let is_logged = false;
  let dateNow = Date.now();
  let last_time_logged = new Date(dateNow).toUTCString();
  try {
      client = await getClient();
      const data = await client.query(queries.createMedico, [nombre_medico, apellido_medico, email, password_hash, id_colegiado, rol, is_active, is_logged, last_time_logged])
      result = data.rowCount;
  } catch (err) {
      console.log(err);
      throw err;
  } finally {
      client.release();
  }
  return result
};

/**
 * Descripción: Esta función busca todos los médicos de la BBDD y los muestra en base al limit y al offset pasados como parámetro desde el controlador
 * @memberof Models.medicos 
 * @method getAllMedicos 
 * @async
 * @param {JSON} entry - JSON con un objeto con dos key-value (limit y offset)
 * @return {Array} Devuelve un array de objetos con cada uno de los médicos de la BBDD
 * @throws {Error} Error de consulta a la BBDD
 */
const getAllMedicos = async (entry) => {
  const { limit, offset } = entry;
  let client, result;
    try {
        client = await getClient();
        const data = await client.query(queries.getAllMedicos, [limit, offset])
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

/**
 * Descripción: Esta función busca en la BBDD un médico en base a su email.
 * @memberof Models.medicos 
 * @method getMedicosByEmail 
 * @async
 * @param {string} email - String con el email a buscar.
 * @return {Object} Devuelve un objeto con todos los datos del médico.
 * @throws {Error} Error de consulta a la BBDD.
 */
const getMedicosByEmail = async (email) => {
  let client, result;
    try {
        client = await getClient();
        const data = await client.query(queries.getMedicosByEmail, [email])
        result = data.rows[0];
        console.log(result);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};

/**
 * Descripción: Esta función edita el rol de un médico en base a su email.
 * @memberof Models.medicos 
 * @method editRole 
 * @async
 * @param {Object} entry - JSON con un objeto con dos key-value (rol e email).
 * @return {Object} Devuelve un objeto con las filas modificadas y el email del médico que ha sido modificado.
 * @throws {Error} Error de consulta a la BBDD.
 */
const editRole = async(entry) => {
  const { rol, email } = entry;
  let client, result;
  try {
      client = await getClient();
      const data = await client.query(queries.editRoleByAdmin, [rol, email])
      result = { rowCount: data.rowCount, email };
      console.log(result);
  } catch (err) {
      console.log(err);
      throw err;
  } finally {
      client.release();
  }
  return result
};

/**
 * Descripción: Esta función edita los campos is_logged y last_time_logged de un médico en base a su email.
 * @memberof Models.medicos 
 * @method editLogged 
 * @async
 * @param {Object} entry - JSON con un objeto con tres key-value (is_logged, last_time_logged e email).
 * @return {Object} Devuelve un objeto con las filas modificadas y el email del médico que ha sido modificado.
 * @throws {Error} Error de consulta a la BBDD.
 */
const editLogged = async(entry) => {
  const { is_logged, last_time_logged, email } = entry;
  let client, result;
  try {
      client = await getClient();
      const data = await client.query(queries.editLogged, [is_logged, last_time_logged, email])
      result = { rowCount: data.rowCount, email };
  } catch (err) {
      console.log(err);
      throw err;
  } finally {
      client.release();
  }
  return result
};

/**
 * Descripción: Esta función edita la contraseña de un médico en base a su email.
 * @memberof Models.medicos 
 * @method editPassword 
 * @async
 * @param {Object} entry - JSON con un objeto con dos key-value (password_hash e email).
 * @return {Object} Devuelve un objeto con las filas modificadas y el email del médico que ha sido modificado.
 * @throws {Error} Error de consulta a la BBDD.
 */
const editPassword = async (entry) => {
  const { password_hash, email } = entry;
  let client, result;
  try {
      client = await getClient();
      const data = await client.query(queries.editPassword, [password_hash, email])
      result = { rowCount: data.rowCount, email };
      console.log(data);
  } catch (err) {
      console.log(err);
      throw err;
  } finally {
      client.release();
  }
  return result
};


module.exports = {
  createMedico,
  getAllMedicos,
  getMedicosByEmail,
  editRole,
  editLogged,
  editPassword
}


//PRUEBAS
//CREAR
/*const newMedico = {
  nombre_medico: 'Sergio',
  apellido_medico: 'Lillo',
  email: 'sergio@madrid.com',
  password_hash: 'asafasfsasa351325',
  id_colegiado: 45667
}

createMedico(newMedico);
getAllMedicos({limit: 5, offset: 0});
getMedicosByEmail('ana@madrid.com');
editRole({rol:'admin', email:'sergio@madrid.com'});
editLogged({is_logged: true, last_time_logged:'2024-07-14', email: 'sergio@madrid.com'});
editPassword({password_hash: 'asafasfafas978797', email:'sergio@madrid.com'});
*/