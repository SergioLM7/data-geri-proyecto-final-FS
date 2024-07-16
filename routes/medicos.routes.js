
const express = require('express');
const medicosControllers = require("../controllers/medicos.controllers");
const router = express.Router();


router.get("/", medicosControllers.getMedicos);
router.post("/", medicosControllers.postMedicos);


module.exports = router;