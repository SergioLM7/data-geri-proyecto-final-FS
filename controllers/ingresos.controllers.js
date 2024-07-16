/**
 * @author Sergio Lillo <Data Geri> 
 * @exports controllers
 * @namespace Controllers.ingresos
 */

const ingresosEntry = require('../services/ingresos.services');

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


const getIngresos = (req,res)=> {
    let ingresos;
    try {
        if (req.body.email) {
            //Meter el validador del GET
            console.log('entrando email por body')
            ingresos = ingresosEntry.getIngresosByMedico(req.body);
        } else if (req.query.email) {
            //Meter el validador del GET
            console.log('entrando email por query')
            ingresos = ingresosEntry.getIngresosByMedico(req.query);
        } /*else if (req.body.historia_clinica) {
            //Meter el validador del GET
            console.log('entrando historia_clinica por body')
            ingresos = await ingresosEntry.getIngresosByHistoria(req.body);
        }*/
        res.status(200).json(ingresos);
        console.log(ingresos)
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

module.exports = {
    createIngreso,
    getIngresos
}