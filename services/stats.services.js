/**
 * @author Sergio Lillo <Data Geri> 
 * @exports services
 * @namespace Services.stats
 */
const { sequelize } = require('../config/db_sql');
const queries = require('../queries/stats.queries');
const Medico = require('../schemas/medicos.schema');
const Ingreso = require('../schemas/ingresos.schema');


const statsGeneralesMedico = async (email) => {
    console.log(email);
    try {
      const results = await sequelize.query(queries.statsGeneralesMedico, {
        type: sequelize.QueryTypes.SELECT,
        replacements: {email}
      });
      console.log(results)
      return results;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };

  const statsGeneralesMedicoAno = async (email, ano) => {
    console.log(email, ano);
    try {
      const results = await sequelize.query(queries.statsGeneralesMedicoAno, {
        type: sequelize.QueryTypes.SELECT,
        replacements: {email,  ano}
      });
      console.log(results)
      return results;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };


  const statsMedicoUltimosTres = async (email) => {
    console.log(email);
    try {
      const results = await sequelize.query(queries.statsGeneralesMedicoUltimosAnos, {
        type: sequelize.QueryTypes.SELECT,
        replacements: {email}
      });
      console.log(results)
      return results;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };

  const statsGeneralesServicio = async () => {
    try {
      const results = await sequelize.query(queries.statsGenerales, {
        type: sequelize.QueryTypes.SELECT
      });
      console.log(results)
      return results;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };

  const statsGeneralesUltimosTres = async () => {
    try {
      const results = await sequelize.query(queries.statsGeneralesUltimosAnos, {
        type: sequelize.QueryTypes.SELECT
      });
      console.log(results)
      return results;
    } catch (error) {
      console.error('Error executing query:', error);
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
