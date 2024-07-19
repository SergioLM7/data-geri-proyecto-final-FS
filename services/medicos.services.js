/**
 * @author Sergio Lillo <Data Geri> 
 * @exports services
 * @namespace Services.medicos
 */
const queries = require('../queries/medicos.queries');
const Medicos = require('../schemas/medicos.schema');
const Ingresos = require('../schemas/ingresos.schema');
const { sequelize } = require('../config/db_sql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const loginMedicos = async (entry) => {
    const { email, password_hash } = entry;
    console.log(entry)
    try {
        const medicoLogin = await Medicos.findOne({ where: { email } });

        if (!medicoLogin || !medicoLogin.is_active) {
            throw new Error('Este usuario ya no está activo.');
        }

        const isPasswordValid = await bcrypt.compare(password_hash, medicoLogin.password_hash);

        if (!isPasswordValid) {
            throw new Error('Usuario o contraseña incorrectos.');
        }

        medicoLogin.is_logged = true;
        medicoLogin.last_time_logged = new Date();
        await medicoLogin.save();

        const token = jwt.sign({ rol: medicoLogin.rol, email: medicoLogin.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

        return token;
    } catch (error) {
        console.error('No se ha podido iniciar sesión.', error);
    }
};

const getAllMedicos = async (entry) => {
    const { limit, offset } = entry;
    try {
        const medicos = await sequelize.query(queries.getAllMedicos, {
            bind: [parseInt(limit, 10), parseInt(offset, 10)],
            type: sequelize.QueryTypes.SELECT
        });
        return medicos;
    } catch (error) {
        console.error('Error al obtener todos los médicos:', error);
        throw error;
    }
};

const createMedico = async (entry) => {
    try {
        const hashedPassword = await bcrypt.hash(entry.password_hash, 10);
        entry.password_hash = hashedPassword;

        const newMedico = await Medicos.create(entry);
        console.log(newMedico)
        if (newMedico) {
            return newMedico;
        }
    } catch (error) {
        console.error('Error al crear un nuevo médico:', error);
        throw new Error('No se ha podido crear este médico. Inténtelo de nuevo.');
    }
};

const getMedicoByEmail = async (email) => {
    try {
        const medico = await Medicos.findOne({
            where: { email },
            include: {
                model: Ingresos
            }
        });
        return medico;
    } catch (error) {
        console.error('El médico no ha sido encontrado', error);
        throw error;
    }
};

const editRole = async (entry) => {
    const { rol, email } = entry;
    try {
        const [updatedCount] = await Medicos.update({ rol }, {
            where: { email }
        });

        if (updatedCount === 0) {
            throw new Error('No se encontró el médico o no se realizó ningún cambio');
        }
        const result = { rowCount: updatedCount, email };
        return result;
    } catch (error) {
        console.error('Error al actualizar el rol del médico:', error);
        throw error;
    }
};

const editLogged = async (email, is_logged, last_time_logged) => {
    console.log(email, is_logged, last_time_logged)
    try {
        const [updatedCount] = await Medicos.update(
            { is_logged, last_time_logged },
            { where: { email } }
        );
        console.log(updatedCount);

        if (updatedCount === 0) {
            throw new Error('No se encontró al médico o no se pudo cerrar sesión.');
        }

        return {
            rowCount: updatedCount,
        };
    } catch (error) {
        console.error('Error al actualizar el inicio de sesión del médico:', error);
        throw error;
    }
};

const editPassword = async (entry) => {
    const { password_hash, email } = entry;
    try {
        const [updatedCount] = await Medicos.update({ password_hash }, {
            where: { email }
        });

        if (updatedCount === 0) {
            throw new Error('No se encontró el médico o no se realizó ningún cambio');
        }
        const result = { rowCount: updatedCount, email };
        return result;
    } catch (error) {
        console.error('Error al actualizar la contraseña del médico:', error);
        throw error;
    }
};


const deleteMedico = async (entry) => {
    const { is_active, email } = entry;
    try {
        const [updatedCount] = await Medicos.update({ is_active }, {
            where: { email }
        });

        if (updatedCount === 0) {
            throw new Error('No se encontró el médico o no se realizó ningún cambio');
        }
        const result = { rowCount: updatedCount, email };
        return result;
    } catch (error) {
        console.error('Error al desactivar al médico/usuario:', error);
        throw error;
    }
};


module.exports = {
    getAllMedicos,
    createMedico,
    getMedicoByEmail,
    editRole,
    editLogged,
    deleteMedico,
    editPassword,
    loginMedicos
}






/*const getAllMedicos = async (entry) => {
    const { email, offset } = entry;
    console.log(email, offset);
    try {
       const medico = await Medicos.findOne({
            where: { email }
        });

        if (!medico) {
            throw new Error('Medico not found');
        }

        const ingresosData = await Ingresos.findAll({
            where: { medico_id: medico.medico_id },
            offset,
            limit: 10
        });

        /*const result = await Medico.findAll({
            where:{email},
            offset,
            limit: 10,
            include: {
                model: Ingreso
            }
        })*/
/*result = ingresosData;
console.log(result);
return result;

} catch (err) {
console.error(err);
throw err;
}
}*/
