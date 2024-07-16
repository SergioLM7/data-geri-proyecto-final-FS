const seedMedicos = require('./medicos-seeds');
const seedIngresos = require('./ingresos-seed');

const seedDatabase = async () => {
    try {
        const medicos = await seedMedicos();
        console.log("******************", medicos);
        await seedIngresos(medicos);
    } catch (error) {
        console.error('Error al poblar la base de datos', error);
    }
};

module.exports = { seedDatabase };