const express = require('express');
const medicosControllers = require("../controllers/medicos.controllers");
const router = express.Router();


router.get("/", medicosControllers.getMedicos);
router.post("/", medicosControllers.postMedicos);
router.put("/", medicosControllers.editMedico);


module.exports = router;