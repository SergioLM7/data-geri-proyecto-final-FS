/**
 * @author Sergio Lillo <Data Geri> 
 * @exports controllers
 * @namespace Controllers.medicos
 */

const services = require('../services/medicos.services');


/**
 * Descripción: Esta función llama desde la ruta /api/medicos/login al service loginMedicos
 * y devuelve el token o un mensaje de error.
 * @memberof Controllers.medicos 
 * @method loginMedico
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al iniciar sesión.
 */
const loginMedico = async (req, res) => {
    try {
        console.log(req.body);
        const userLogin = await services.loginMedicos(req.body);
        res.status(200).json(userLogin);
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.message || 'Error en el login.' });
    }
};


/**
 * Descripción: Esta función llama desde la ruta /api/medicos/logout al service editLogged
 * y devuelve un objeto con el número de filas editadas (1 o 0) y un mensaje o un mensaje de error
 * @memberof Controllers.medicos 
 * @method logoutMedico
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al cerrar sesión.
 */
const logoutMedico = async (req, res) => {
    const { email } = req.medico;
    console.log('Esto es lo que llega al controller', req.medico)
    const is_logged = false;
    const last_time_logged = new Date();

    console.log('Médico haciendo logout:', req.medico);
    console.log(email, is_logged, last_time_logged);

    try {
        const result = await services.editLogged(email, is_logged, last_time_logged);
        res.status(200).json({ message: 'Logout exitoso', result });
    } catch (error) {
        console.error('Error al cerrar sesión del médico:', error);
        res.status(500).json({ message: error.message || 'Error al cerrar sesión.' });
    }
};


/**
 * Descripción: Esta función llama desde la ruta /api/medicos al service getMedicoByEmail si en req.query está el campo email
 * si no, llmará a getAllMedicos. Devuelve en ambos casos el objeto/objetos encontrados, o un error. 
 * @memberof Controllers.medicos 
 * @method getMedicos
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error en la BBDD.
 */
const getMedicos = async (req, res) => {
    try {
        const { email } = req.query;
        if (email) {
            const medico = await services.getMedicoByEmail(email);
            res.status(200).json(medico);
        } else {
            const allMedicos = await services.getAllMedicos(req.query);
            res.status(200).json(allMedicos);
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

/**
 * Descripción: Esta función llama desde la ruta /api/medicos al service createMedico
 * y devuelve un objeto con el nuevo médico creado y un mensaje, o un error.
 * @memberof Controllers.medicos 
 * @method postMedicos
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al crear el médico.
 */
const postMedicos = async (req, res) => {
    try {
        const newMedicos = await services.createMedico(req.body);
        res.status(201).json({
            newMedicos,
            message: `Se ha creado el usuario ${newMedicos.dataValues.email}`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Error al crear el médico.' });
    }
}


/**
 * Descripción: Esta función llama al service editRole si en req.query está el campo rol o a editPassword,
 * si está el campo password_hash, o a deleteMedico, si está el campo is_active.
 * Devuelve en todos los casos el objeto editado y un mensaje, o un error. 
 * @memberof Controllers.medicos 
 * @method editMedico
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al editar los campos del médico.
 */
const editMedico = async (req, res) => {
    try {
        if (req.body.rol) {
            console.log('voy a editar el rol')
            const result = await services.editRole(req.body);
            res.status(200).json({
                result,
                message: `Se ha editado el rol del médico: ${req.body.email}`
            });
        } else if (req.body.password_hash) {
            console.log('voy a editar la pass')
            const result = await services.editPassword(req.body);
            res.status(200).json({
                result,
                message: `Se ha editado su contraseña: ${req.body.email}`
            });
        } else if (req.body.is_active) {
            console.log('voy a editar el is_active')
            const result = await services.deleteMedico(req.body);
            res.status(200).json({
                result,
                message: `Se ha desactivo el médico: ${req.body.email}`
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al editar los campos del médico' });
    }
};



const controllers = {
    getMedicos,
    postMedicos,
    editMedico,
    loginMedico,
    logoutMedico
}


module.exports = controllers;