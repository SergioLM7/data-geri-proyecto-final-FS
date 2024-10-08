/**
 * @author Sergio Lillo <Data Geri> 
 * @exports services
 * @namespace Services.medicos
 * @description Este módulo contiene servicios relacionados con médicos.
 */
const queries = require('../queries/medicos.queries');
const Medicos = require('../schemas/medicos.schema');
const Ingresos = require('../schemas/ingresos.schema');
const { sequelize } = require('../config/db_sql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


/**
 * Descripción: Esta función busca en la BBDD el email del usuario que quiere iniciar sesión, si lo encuentra,
 * compara la contraseña con la que tiene guardada (deshasheandola) y si el resultado es correcto, crea un JWT.
 * @memberof Services.medicos 
 * @method loginMedico 
 * @async
 * @param {JSON} entry - JSON con el email del médico y la password.
 * @return {string} Devuelve una cadena de texto con el token.
 * @throws {Error} Error al iniciar sesión.
 */
const loginMedicos = async (entry) => {
    const { email, password_hash } = entry;
    //console.log(entry)
    try {
        const medicoLogin = await Medicos.findOne({ where: { email } });
        console.log(medicoLogin)

        if (!medicoLogin || medicoLogin.is_active === false) {
            throw new Error('Este usuario ya no está activo o no existe.');
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
        throw new Error('Error en las credenciales.');
    }
};

/**
 * Descripción: Esta función busca en la BBDD todos los médicos, y los devuelve en base a un limit y un offset.
 * @memberof Services.medicos 
 * @method getAllMedicos 
 * @async
 * @param {JSON} entry - JSON con el limit y el offset.
 * @return {Array} Devuelve un array de objetos con todos los médicos solicitados en base al limit y el offset.
 * @throws {Error} Error al obtener los datos.
 */
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

/**
 * Descripción: Esta función crea en la BBDD un usuario/médico en base a los campos pasados desde el front.
 * @memberof Services.medicos 
 * @method createMedico 
 * @async
 * @param {JSON} entry - JSON con todos los campos necesarios para crear un médico/usuario.
 * @return {Object} Devuelve el objeto creado o un error.
 * @throws {Error} Error al crear el usuario.
 */
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

/**
 * Descripción: Esta función busca en la BBDD un médico/usuario en base a su email.
 * @memberof Services.medicos 
 * @method getMedicoByEmail 
 * @async
 * @param {string} email - Cadena de texto con el email a consultar.
 * @return {Object} Devuelve un objeto con los datos del médico solicitado.
 * @throws {Error} Error al encontrar los datos.
 */
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

/**
 * Descripción: Esta función edita el campo rol de un usuario por su email.
 * @memberof Services.medicos 
 * @method editRole 
 * @async
 * @param {JSON} entry - JSON con el email y el rol.
 * @return {Array} Devuelve un array de objetos con las filas modificadas y el email.
 * @throws {Error} Error al actualizar el rol del usuario.
 */
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

/**
 * Descripción: Esta función edita los campos is_logged y last_time_logged en base al email del usuario.
 * @memberof Services.medicos 
 * @method editLogged 
 * @async
 * @param {JSON} entry - JSON con el email, el dato de is_Logged y el dato de last_time_logged.
 * @return {Object} Devuelve un objeto con el número de filas eliminadas.
 * @throws {Error} Error al actualizar el inicio de sesión de un médico.
 */
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

/**
 * Descripción: Esta función edita el campo contraseña de un usuario por su email.
 * @memberof Services.medicos 
 * @method editPassword 
 * @async
 * @param {JSON} entry - JSON con el email y la contraseña.
 * @return {Array} Devuelve un array de objetos con las filas modificadas y el email.
 * @throws {Error} Error al actualizar la contraseña del usuario.
 */
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

/**
 * Descripción: Esta función edita el campo is_active en base al email del usuario.
 * @memberof Services.medicos 
 * @method deleteMedico 
 * @async
 * @param {JSON} entry - JSON con el email y el valor de is_active.
 * @return {Array} Devuelve un array de objetos con las filas modificadas y el email.
 * @throws {Error} Error al desactivar al usuario.
 */
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
