/**
 * @author Sergio Lillo <Data Geri> 
 * @exports controllers
 * @namespace Controllers.stats
 */
const statsServices = require('../services/stats.services');

/**
 * Descripción: Esta función llama desde la ruta /api/stats al modelo getStatsGeneralesMedico
 * Este espera recibir por param el año y el email, o solo el email del médico a consultar.
 * @memberof Controllers.stats 
 * @method getStatsGeneralesMedico
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express con un JSON con los datos solicitados.
 * @throws {Error} Error al cargar las estadísticas.
 */
const getStatsGeneralesMedico = async (req, res) => {
    try {
        if (req.params.ano) {
            const { email, ano } = req.params;
            const stats = await statsServices.statsGeneralesMedicoAno(email, ano);
            res.status(200).json(stats);
        } else {
            const { email } = req.params;
            console.log(req.params);
            const stats = await statsServices.statsGeneralesMedico(email);
            res.status(200).json(stats);
        }
    } catch (error) {
        console.error('Error al cargar las estadísticas.', error);
        res.status(500).json({ error: 'Error al cargar las estadísticas.' });
    }
};

/**
 * Descripción: Esta función llama desde la ruta /api/stats/ultimos al modelo getStatsMedicoTresUltimos
 * Este espera recibir por param el email del médico a consultar.
 * @memberof Controllers.stats 
 * @method getStatsMedicoTresUltimos
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express con un JSON con los datos solicitados.
 * @throws {Error} Error al cargar las estadísticas.
 */
const getStatsMedicoTresUltimos = async (req, res) => {
    try {
        const { email } = req.params;
        const stats = await statsServices.statsMedicoUltimosTres(email);
        res.status(200).json(stats);
    } catch (error) {
        console.error('Error al cargar las estadísticas de los últimos 3 años.', error);
        res.status(500).json({ error: 'Error al cargar las estadísticas de los últimos 3 años.' });
    }
};

/**
 * Descripción: Esta función llama desde la ruta /api/stats/statsservicio al modelo getStatsGenerales
 * @memberof Controllers.stats 
 * @method getStatsGenerales
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express con un JSON con los datos solicitados.
 * @throws {Error} Error al cargar las estadísticas.
 */
const getStatsGenerales = async (req, res) => {
    try {
        const servicio = await statsServices.statsGeneralesServicio();
        res.status(200).json(servicio);
    } catch (error) {
        console.error('Error al cargar las estadísticas generales del servicio.', error);
        res.status(500).json({ message: error.message || 'Error al cargar estadísticas.' });
    }
};

/**
 * Descripción: Esta función llama desde la ruta /api/stats/ultimosservicio al modelo getStatsUltimosTres
 * @memberof Controllers.stats 
 * @method getStatsUltimosTres
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express con un JSON con los datos solicitados.
 * @throws {Error} Error al cargar las estadísticas.
 */
const getStatsUltimosTres = async (req, res) => {
    try {
        const stats = await statsServices.statsGeneralesUltimosTres();
        res.status(200).json(stats);
    } catch (error) {
        console.error('Error al cargar las estadísticas de los últimos 3 años.', error);
        res.status(500).json({ message: error.message || 'Error al cargar estadísticas generales de los últimos 3 años..'  });
    }
};

module.exports = {
    getStatsGeneralesMedico,
    getStatsMedicoTresUltimos,
    getStatsGenerales,
    getStatsUltimosTres
};