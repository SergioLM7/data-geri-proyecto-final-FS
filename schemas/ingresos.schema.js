const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db_sql');
const Medico = require('./medicos.schema')
console.log(sequelize.sequelize);


const Ingreso = sequelize.define('Ingreso', {
    ingreso_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    medico_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Medico,
            key: 'medico_id',
        },
    },
    historia_clinica: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombre_paciente: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    apellido_paciente: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    sexo: {
        type: DataTypes.STRING(7),
        allowNull: false,
    },
    edad_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_ingreso: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    fecha_alta: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    duracion_ingreso: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    diagnostico_principal: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    barthel_basal: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'ingresos',
    timestamps: false,
    /* indexes: [
        {
            unique: true,
            fields: ['historia_clinica', 'nombre_paciente', 'apellido_paciente', 'fecha_ingreso'],
        },
    ], */
});

module.exports = Ingreso;