const express = require('express');
const medicosControllers = require("../controllers/medicos.controllers");
const router = express.Router();
const authorization = require('../middlewares/authorization');



router.get("/", medicosControllers.getMedicos);
router.post("/", medicosControllers.postMedicos);
router.post("/login", medicosControllers.loginMedico);
router.put("/logout", authorization, medicosControllers.logoutMedico);


module.exports = router;