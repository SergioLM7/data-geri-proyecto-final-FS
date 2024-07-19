const statsServices = require('../services/stats.services');

const getStatsGeneralesMedico = async (req, res) => {
  try {
    if (req.params.ano) {
        const { email, ano } = req.params;
        const stats = await statsServices.statsGeneralesMedicoAno(email,ano);
        res.status(200).json(stats);
    } else {
        const { email } = req.params;
        console.log(req.params);
        const stats = await statsServices.statsGeneralesMedico(email);
        res.status(200).json(stats);
    }
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Error getting stats' });
  }
};

module.exports = {
  getStatsGeneralesMedico,
};