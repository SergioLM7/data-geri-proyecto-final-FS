const express = require('express');
const statsControllers = require('../controllers/stats.controllers');
const router = express.Router();

router.get('/statsservicio/', statsControllers.getStatsGenerales);
router.get('/ultimosservicio/', statsControllers.getStatsUltimosTres);
router.get('/:email', statsControllers.getStatsGeneralesMedico);
router.get('/ultimos/:email', statsControllers.getStatsMedicoTresUltimos);

module.exports = router;