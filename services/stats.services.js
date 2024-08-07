/**
 * @author Sergio Lillo <Data Geri> 
 * @exports services
 * @namespace Services.stats
 */
const { sequelize } = require('../config/db_sql');
const queries = require('../queries/stats.queries');
const Medico = require('../schemas/medicos.schema');
const Ingreso = require('../schemas/ingresos.schema');

/**
 * Descripción: Esta función obtiene todas las estadísticas de los ingresos de un médico por su email.
 * @memberof Services.stats 
 * @method statsGeneralesMedico 
 * @async
 * @param {string} email - Cadena de texto con el email.
 * @return {Object} Devuelve un objeto con los resultados estadísticos.
 * @throws {Error} Error al obtener los datos.
 */
const statsGeneralesMedico = async (email) => {
  console.log(email);
  try {
    const results = await sequelize.query(queries.statsGeneralesMedico, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { email }
    });
    console.log(results)
    return results;
  } catch (error) {
    console.error('Error al ejecutar la query:', error);
    throw error;
  }
};

/**
* Descripción: Esta función obtiene las estadísticas de los ingresos de un médico por su email y año.
* @memberof Services.stats 
* @method statsGeneralesMedicoAno 
* @async
* @param {string} email - Cadena de texto con el email.
* @param {number} ano - Integer con el año.
* @return {Object} Devuelve un objeto con los resultados estadísticos.
* @throws {Error} Error al obtener los datos.
*/
const statsGeneralesMedicoAno = async (email, ano) => {
  console.log(email, ano);
  try {
    const results = await sequelize.query(queries.statsGeneralesMedicoAno, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { email, ano }
    });
    console.log(results)
    return results;
  } catch (error) {
    console.error('Error al ejecutar la query:', error);
    throw error;
  }
};


/**
 * Descripción: Esta función obtiene las estadísticas de los últimos 3 años de los ingresos de un médico por su email.
 * @memberof Services.stats 
 * @method statsMedicoUltimosTres 
 * @async
 * @param {string} email - Cadena de texto con el email.
 * @return {Object} Devuelve un objeto con los resultados estadísticos.
 * @throws {Error} Error al obtener los datos.
 */
const statsMedicoUltimosTres = async (email) => {
  console.log(email);
  try {
    const results = await sequelize.query(queries.statsGeneralesMedicoUltimosAnos, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { email }
    });
    console.log(results)
    return results;
  } catch (error) {
    console.error('Error al ejecutar la query:', error);
    throw error;
  }
};

/**
 * Descripción: Esta función obtiene las estadísticas de todos los ingresos de la BBDD.
 * @memberof Services.stats 
 * @method statsGeneralesServicio 
 * @async
 * @return {Object} Devuelve un objeto con los resultados estadísticos.
 * @throws {Error} Error al obtener los datos.
 */
const statsGeneralesServicio = async () => {
  try {
    const results = await sequelize.query(queries.statsGenerales, {
      type: sequelize.QueryTypes.SELECT
    });
    console.log(results)
    return results;
  } catch (error) {
    console.error('Error al ejecutar la query:', error);
    throw error;
  }
};

/**
 * Descripción: Esta función obtiene las estadísticas de los últimos 3 años de todos los ingresos de la BBDD.
 * @memberof Services.stats 
 * @method statsGeneralesUltimosTres 
 * @async
 * @return {Object} Devuelve un objeto con los resultados estadísticos.
 * @throws {Error} Error al obtener los datos.
 */
const statsGeneralesUltimosTres = async () => {
  try {
    const results = await sequelize.query(queries.statsGeneralesUltimosAnos, {
      type: sequelize.QueryTypes.SELECT
    });
    console.log(results)
    return results;
  } catch (error) {
    console.error('Error al ejecutar la query:', error);
    throw error;
  }
};

module.exports = {
  statsGeneralesMedico,
  statsGeneralesMedicoAno,
  statsMedicoUltimosTres,
  statsGeneralesServicio,
  statsGeneralesUltimosTres
};


//PRUEBAS
//statsGeneralesMedico('ana@madrid.com').catch((error) => console.error(error));
//statsGeneralesMedicoAno('ana@madrid.com', 2024).catch((error) => console.error(error));
