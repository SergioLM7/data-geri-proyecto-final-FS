const Medicos = require('../schemas/medicos.schema');
const Ingresos = require('../schemas/ingresos.schema');


const getMedicos = async (req, res) => {
    const medicos = await Medicos.findAll({
        include: Ingresos
    });
    res.status(200).json(medicos);


}


const postMedicos = async (req, res) => {
    try {
        const newMedicos = await Medicos.bulkCreate(req.body);
        res.status(201).json(newMedicos);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}



const controllers = {
    getMedicos,
    postMedicos
}


module.exports = controllers;