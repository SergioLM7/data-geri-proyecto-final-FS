/**
 * @author Sergio Lillo <Data Geri> 
 * @exports models
 * @namespace Models.ingresos
 */
const { getClient } = require('../config/db_sql');
const queries = require('../queries/ingresos.queries');

/**
 * Descripción: Esta función crea un ingreso en la tabla ingresos.
 * @memberof Models.ingresos 
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
 * @memberof Models.ingresos 
 * @method getIngresosByMedico 
 * @async
 * @param {JSON} entry - JSON con el email del médico y el offset de la paginación.
 * @return {Array} Devuelve un array de objeto con, máximo, 10 ingresos relacionados con dicho médico en base al offset.
 * @throws {Error} Error de consulta a la BBDD
 */
const getIngresosByMedico = async (entry) => {
    const { email, offset } = entry;
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

/**
 * Descripción: Esta función busca en la BBDD los ingresos por el nº de historia clínica del paciente.
 * @memberof Models.ingresos 
 * @method getIngresosByHistoria 
 * @async
 * @param {JSON} entry - JSON con el nº de historia clínica y el offset de la paginación.
 * @return {Array} Devuelve un array de objeto con, máximo, 10 ingresos relacionados con dicho paciente en base al offset.
 * @throws {Error} Error de consulta a la BBDD
 */
const getIngresosByHistoria = async (entry) => {
    const { historia_clinica, offset } = entry;
    let client, result;
    try {
        client = await getClient();
        const data = await client.query(queries.getIngresosByHistoria, [historia_clinica, offset])
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
 * Descripción: Esta función elimina de la BBDD el ingreso en base al id del mismo.
 * @memberof Models.ingresos 
 * @method deleteIngreso 
 * @async
 * @param {Integer} id - Integer con el nº del ID del ingreso.
 * @return {Integer} Devuelve un integer con el número de filas eliminadas.
 * @throws {Error} Error de consulta a la BBDD
 */
const deleteIngreso = async (id) => {
    let client, result;
    try {
        client = await getClient();
        const data = await client.query(queries.deleteIngreso, [id])
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
 * Descripción: Esta función edita todas las filas de la tabla ingresos por ingreso_id
 * @memberof Models.ingresos  
 * @method editIngreso 
 * @async 
 * @param {JSON} entry - Un JSON con los nuevos valores y los previos del ingreso a editar.
 * @return {Object} Devuelve un objeto con el número de filas modificadas y un mensaje con el ingreso_id
 * @throws {Error} Error de consulta a la BBDD
 */
const editIngreso = async (entry) => {
    const { ingreso_id, medico_id, historia_clinica, nombre_paciente, apellido_paciente, sexo, edad_paciente, fecha_ingreso, fecha_alta, diagnostico_principal, barthel_basal } = entry;
    let client, result;
    try {
        client = await getClient();
        const data = await client.query(queries.editIngreso, [ingreso_id, medico_id, historia_clinica, nombre_paciente, apellido_paciente, sexo, edad_paciente, fecha_ingreso, fecha_alta, diagnostico_principal, barthel_basal])
        result = { rowCount: data.rowCount, message: `Se ha editado el ingreso ${ingreso_id}`};
        console.log(result)
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};


module.exports = {
    createIngreso,
    getIngresosByMedico,
    getIngresosByHistoria,
    deleteIngreso,
    editIngreso
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
  getIngresosByMedico({email: 'carlos@barcelona.com', offset: 0});
  getIngresosByHistoria({historia_clinica: 4327, offset:0});
  deleteIngreso(id);
  editIngreso({
    ingreso_id: 138,
    medico_id: 34, 
    historia_clinica: 4500, 
    nombre_paciente: 'Andrea', 
    apellido_paciente: 'Buenafuente', 
    sexo: 'Mujer', 
    edad_paciente: 91, 
    fecha_ingreso: '2022/07/11',
    fecha_alta: '2022/07/23', 
    diagnostico_principal: 'ITU', 
    barthel_basal: 40
  });
  */