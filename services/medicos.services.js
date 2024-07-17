/**
 * @author Sergio Lillo <Data Geri> 
 * @exports services
 * @namespace Services.medicos
 */
const queries = require('../queries/medicos.queries');
const Medicos = require('../schemas/medicos.schema');
const Ingresos = require('../schemas/ingresos.schema');
const { sequelize } = require('../config/db_sql');


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
        const newMedico = await Medicos.create(entry);
        console.log(newMedico)
        if(newMedico) {
            return newMedico;
        }
    } catch (error) {
        console.error('Error al crear un nuevo médico:', error);
        throw error;
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

const editLogged = async (entry) => {
    const { is_logged, last_time_logged, email } = entry;
    try {
        const [updatedCount] = await Medicos.update({ is_logged, last_time_logged }, {
            where: { email }
        });

        if (updatedCount === 0) {
            throw new Error('No se encontró el médico o no se realizó ningún cambio');
        }
        const result = { rowCount: updatedCount, email };
        return result;
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
    const {is_active, email} = entry;
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
    editPassword
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
