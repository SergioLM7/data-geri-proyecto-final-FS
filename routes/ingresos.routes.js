const express = require('express');
const ingresosControllers = require("../controllers/ingresos.controllers");
const ingresosValidators = require('../utils/ingresos.validators');
const router = express.Router();

router.get('/', ingresosControllers.getIngresos);
router.post('/', ingresosValidators.ingresoValidator, ingresosControllers.createIngreso);
router.put('/', ingresosValidators.ingresoValidator, ingresosControllers.editIngreso);
router.delete('/:ingreso_id', ingresosControllers.deleteIngreso);

module.exports = router;