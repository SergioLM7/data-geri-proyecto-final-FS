const express = require('express');
const ingresosControllers = require("../controllers/ingresos.controllers");
const router = express.Router();

//router.get('/:email?', ingresosControllers.getIngresos);
router.get('/', ingresosControllers.getIngresos);
router.post('/', ingresosControllers.createIngreso);
router.put('/', ingresosControllers.editIngreso);
router.delete('/', ingresosControllers.deleteIngreso);

module.exports = router;