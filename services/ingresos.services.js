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
    const { email, offset } = entry;
    console.log(email, offset);
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
        result = ingresosData;
        console.log(result);
        return result;

    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = {
    getIngresosByMedico
};

//PRUEBAS
//getIngresosByMedico({email: 'carlos@barcelona.com', offset: 0})