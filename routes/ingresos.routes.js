const express = require('express');
const ingresosControllers = require("../controllers/ingresos.controllers");
const router = express.Router();

router.get('/ingresos/:email?', ingresosControllers.getIngresos);
router.get('/ingresos/:historia_clinica?', ingresosControllers.getIngresos);

router.post('/ingresos', ingresosControllers.createIngreso);

module.exports = router;