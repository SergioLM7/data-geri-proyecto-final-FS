const Medico = require('./medicos.schema');
const Ingreso = require('./ingresos.schema');

// Establecer relaciones 
Medico.hasMany(Ingreso, { foreignKey: 'medico_id' });
Ingreso.belongsTo(Medico, { foreignKey: 'medico_id' });


