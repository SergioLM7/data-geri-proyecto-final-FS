const express = require('express');
const medicosControllers = require('../controllers/medicos.controllers');
const medicosValidators = require('../middlewares/medicos.validators');
const router = express.Router();
const authorization = require('../middlewares/authorization');



router.get('/', medicosValidators.queryMedicoValidator, medicosControllers.getMedicos);
router.post('/', medicosValidators.medicoBodyValidator, medicosControllers.postMedicos);
router.post('/login', medicosValidators.loginValidator, medicosControllers.loginMedico);
router.put('/logout', authorization, medicosControllers.logoutMedico);


module.exports = router;