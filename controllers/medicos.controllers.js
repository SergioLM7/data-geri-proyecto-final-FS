const services = require('../services/medicos.services');

const loginMedico = async (req, res) => {
    try {
        console.log(req.body);
        const userLogin = await services.loginMedicos(req.body);
        res.status(201).json(userLogin);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Error en el login.' });
    }
};

const logoutMedico = async (req, res) => {
    const { email } = req.medico;
    const is_logged = false;
    const last_time_logged = new Date();

    console.log('Médico haciendo logout:', req.medico);

    try {
        const result = await editLogged({ email, is_logged, last_time_logged });
        res.status(200).json({ message: 'Logout exitoso', result });
    } catch (error) {
        console.error('Error al cerrar sesión del médico:', error);
        res.status(500).json({ message: error.message || 'Error al cerrar sesión.' });
    }
};

const getMedicos = async (req, res) => {
    try {
        const { email } = req.query;
        console.log(req.params);
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