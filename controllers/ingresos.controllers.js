/**
 * @author Sergio Lillo <Data Geri> 
 * @exports controllers
 * @namespace Controllers.ingresos
 */

const ingresosService = require('../services/ingresos.services');

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
        const response = await ingresosService.createIngreso(req.body);
        res.status(201).json({
            message: `Ingreso creado para el paciente: ${req.body.nombre_paciente + ' ' + req.body.apellido_paciente}`
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el ingreso', error });
    }
};


const getIngresos = async (req,res)=> {
    try {
        if (req.body.email) {
            //Meter el validador del GET
            console.log('entrando email por body')
            const ingresos = await ingresosService.getIngresosByMedico(req.body);
            res.status(200).json(ingresos);
            console.log(ingresos)
        } else if (req.query.email) {
            //Meter el validador del GET
            console.log('entrando email por query')
            const ingresos  = await ingresosService.getIngresosByMedico(req.query);
            res.status(200).json(ingresos);
            console.log(ingresos)
        } else if (req.query.historia_clinica) {
            //Meter el validador del GET
            console.log('entrando historia_clinica por body')
            const ingresos = await ingresosService.getIngresosByHistoria(req.query);
            res.status(200).json(ingresos);
            console.log(ingresos)
        }
       
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};


const deleteIngreso = async (req, res) => {
    const { ingreso_id } = req.params;
    try {
        const response = await ingresosService.deleteIngreso(ingreso_id);
        res.status(201).json({
            message: `Se ha eliminado el ingreso: ${ingreso_id}`
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el ingreso', error });
    }
};

const editIngreso = async (req, res) => {
    try {
        const updatedIngreso = await ingresosService.editIngreso(req.body);
        res.status(200).json({
            message: `Se ha actualizado el ingreso: ${req.body.ingreso_id}`
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el ingreso' });
    }
};

module.exports = {
    createIngreso,
    getIngresos,
    deleteIngreso,
    editIngreso
}