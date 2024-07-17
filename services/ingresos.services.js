/**
 * @author Sergio Lillo <Data Geri> 
 * @exports services
 * @namespace Services.ingresos
 */

const Medico = require('../schemas/medicos.schema');
const Ingreso = require('../schemas/ingresos.schema');

/**
 * Descripción: Esta función busca en la BBDD los ingresos de un médico en base a su email.
 * @memberof Services.ingresos 
 * @method getIngresosByMedico 
 * @async
 * @param {JSON} entry - JSON con el email del médico y el offset de la paginación.
 * @return {Array} Devuelve un array de objetos con, máximo, 10 ingresos relacionados con dicho médico en base al offset.
 * @throws {Error} Error de consulta a la BBDD
 */
const getIngresosByMedico = async (entry) => {
    const { email, offset, limit } = entry;
    try {
        const medico = await Medico.findOne({
            where: { email }
        });

        if (!medico) {
            throw new Error('Medico not found');
        }

        const ingresosData = await Ingreso.findAll({
            where: { medico_id: medico.medico_id },
            offset,
            limit
        });

        /*const result = await Medico.findAll({
            where:{email},
            offset,
            limit: 10,
            include: {
                model: Ingreso
            }
        })*/
        const result = ingresosData.map(element => element.dataValues);
        console.log(result)
        return result;

    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getIngresosByHistoria = async (entry) => {
    const { historia_clinica, offset, limit } = entry;
    try {
        const historia = await Ingreso.findAll({
            where: { historia_clinica },
            offset,
            limit
        });

        if (!historia || historia.length === 0) {
            throw new Error('No se ha encontrado la historia clínica');
        }

        const result = historia.map(element => element.dataValues);
        return result;

    } catch (err) {
        console.error(err);
        throw err;
    }

};

const createIngreso = async (entry) => {
    try {
        const { fecha_ingreso, fecha_alta } = entry;
        const fechaIngreso = new Date(fecha_ingreso);
        const fechaAlta = new Date(fecha_alta);
        const duracion_ingreso = Math.floor((fechaAlta - fechaIngreso) / (1000 * 60 * 60 * 24));

        const entryWithDuration = {
            ...entry,
            duracion_ingreso
        };
        const newIngreso = await Ingreso.create(entryWithDuration);
        console.log(newIngreso)

        if (newIngreso) {
            return newIngreso;
        }

    } catch (error) {
        console.error('Error al crear un nuevo ingreso:', error);
        throw error;
    }
};

const deleteIngreso = async (entry) => {
    const {ingreso_id} = entry;
    try {
        const ingresoEliminado = await Ingreso.destroy({
            where: {
            ingreso_id,
          }});

        console.log(ingresoEliminado)

        if (ingresoEliminado === 0) {
            console.log('No se encontró ningún ingreso con ese ID para eliminar.');
        } else if (ingresoEliminado > 0) {
            console.log(`${ingresoEliminado} ingreso eliminado exitosamente.`);
        }

    } catch (error) {
        console.error('Error al eliminar el ingreso:', error);
        throw error;
    }
};

const editIngreso = async (entry) => {
    const { ingreso_id, fieldsToUpdate } = entry;
    try {
        const ingreso = await Ingreso.findByPk(ingreso_id);

        if (!ingreso) {
            throw new Error('No se encontró ningún ingreso con ese ID para actualizar.');
        }

        // Actualizar los campos en la instancia del ingreso (para poder cambiar duracion_ingreso)
        Object.keys(fieldsToUpdate).forEach(field => {
            ingreso[field] = fieldsToUpdate[field];
        });

        await ingreso.save();

        console.log(`Ingreso editado exitosamente: ${ingreso_id}`);
        return ingreso;
    } catch (error) {
        console.error('Error al actualizar el ingreso:', error);
        throw error;
    }
};



module.exports = {
    getIngresosByMedico,
    getIngresosByHistoria,
    createIngreso,
    deleteIngreso,
    editIngreso
};

//PRUEBAS
//getIngresosByMedico({email: 'carlos@barcelona.com', offset: 0})