// seeds/seed.js
const seedMedicos = require('./medicos-seeds');
const seedIngresos = require('./ingresos-seed');

const seedDatabase = async () => {
    const medicos = await seedMedicos();
    if (medicos) {
        await seedIngresos(medicos);
    }
};

seedDatabase();