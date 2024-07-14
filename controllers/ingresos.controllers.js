/**
 * @author Sergio Lillo <Data Geri> 
 * @exports controllers
 * @namespace IngresosQueriesSQL
 */

const ingresosEntry = require('../controllers/ingresos.controllers');

/**
 * Descripción: Esta función llama desde la ruta /api/ingresos al modelo createIngreso
 * Este espera recibir por body todos los campos para crear el ingreso
 * @memberof IngresosQueriesSQL 
 * @method createIngreso
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al crear el usuario
 */
const createIngreso = async (req, res) => {
    try {
        const response = await ingresosEntry.createIngreso(req.body);
        res.status(201).json({
            message: `usuario creado: ${req.body.email}`
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};