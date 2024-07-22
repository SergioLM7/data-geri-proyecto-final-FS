const express = require('express');
const ingresosControllers = require("../controllers/ingresos.controllers");
const ingresosValidators = require('../middlewares/ingresos.validators');
const router = express.Router();

router.get('/', ingresosControllers.getIngresos);
router.post('/', ingresosControllers.createIngreso);
router.put('/', ingresosControllers.editIngreso);
router.delete('/:ingreso_id', ingresosControllers.deleteIngreso);

module.exports = router;