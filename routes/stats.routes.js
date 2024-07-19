const express = require('express');
const statsControllers = require('../controllers/stats.controllers');
const router = express.Router();

router.get('/:email', statsControllers.getStatsGeneralesMedico);

module.exports = router;