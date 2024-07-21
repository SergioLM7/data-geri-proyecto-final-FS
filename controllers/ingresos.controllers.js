/**
 * @author Sergio Lillo <Data Geri> 
 * @exports controllers
 * @namespace Controllers.ingresos
 */
const { validationResult } = require('express-validator');
const ingresosService = require('../services/ingresos.services');

/**
 * Descripción: Esta función llama desde la ruta /api/ingresos al modelo createIngreso
 * Este espera recibir por body todos los campos para crear el ingreso
 * @memberof Controllers.ingresos 
 * @method createIngreso
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express con un JSON que confirma o no si un ingreso se ha creado.
 * @throws {Error} Error al crear el ingreso.
 */
const createIngreso = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const response = await ingresosService.createIngreso(req.body);
        res.status(201).json({
            message: `Ingreso creado para el paciente: ${req.body.nombre_paciente + ' ' + req.body.apellido_paciente}`
        });
    } catch (error) {
        console.error('Error al crear el ingreso:', error);
        res.status(500).json({ message: error.message || 'Error al crear el ingreso' });
    }
};

/**
 * Descripción: Esta función llama desde la ruta /api/ingresos al modelo getIngresos
 * Este espera recibir por body o query el email sobre el que consultar, o el nº de historia clínica.
 * @memberof Controllers.ingresos 
 * @method getIngresos
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express con un JSON con los datos solicitados.
 * @throws {Error} Error al encontrar los ingresos.
 */
const getIngresos = async (req,res)=> {
    try {
        if (req.body.email) {
            const ingresos = await ingresosService.getIngresosByMedico(req.body);
            res.status(200).json(ingresos);
            console.log(ingresos)
        } else if (req.query.email) {
            const ingresos  = await ingresosService.getIngresosByMedico(req.query);
            res.status(200).json(ingresos);
            console.log(ingresos)
        } else if (req.query.historia_clinica) {
            const ingresos = await ingresosService.getIngresosByHistoria(req.query);
            res.status(200).json(ingresos);
            console.log(ingresos)
        }
       
    } catch (error) {
        console.error('Error al buscar el ingreso', error);
        res.status(500).json({ message: error.message || 'Error al buscar el ingreso' });
    }
};

/**
 * Descripción: Esta función llama desde la ruta /api/ingresos al modelo deleteIngreso
 * Este espera recibir por params el ID del ingreso a eliminar.
 * @memberof Controllers.ingresos 
 * @method deleteIngreso
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express con un JSON con un mensaje de error o de éxito.
 * @throws {Error} Error al eliminar el ingreso.
 */
const deleteIngreso = async (req, res) => {
    const { ingreso_id } = req.params;
    try {
        const response = await ingresosService.deleteIngreso(ingreso_id);
        res.status(200).json({
            message: `Se ha eliminado el ingreso: ${ingreso_id}`
        });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al eliminar el ingreso' });

    }
};

/**
 * Descripción: Esta función llama desde la ruta /api/ingresos al modelo editIngreso
 * Este espera recibir por body el ID del ingreso a editar y los datos a modificar.
 * @memberof Controllers.ingresos 
 * @method editIngreso
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express con un JSON con un mensaje de error o de éxito.
 * @throws {Error} Error al editar el ingreso.
 */
const editIngreso = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedIngreso = await ingresosService.editIngreso(req.body);
        res.status(200).json({
            message: `Se ha actualizado el ingreso: ${req.body.ingreso_id}`
        });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al editar el ingreso' });
    }
};

module.exports = {
    createIngreso,
    getIngresos,
    deleteIngreso,
    editIngreso
}