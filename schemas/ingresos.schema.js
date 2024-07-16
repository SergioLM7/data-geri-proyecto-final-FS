const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db_sql');
const Medico = require('./medicos.schema')

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
    hooks: {
        beforeUpdate: (ingreso, options) => {
            console.log(ingreso)
            if (ingreso.changed('fecha_ingreso') || ingreso.changed('fecha_alta')) {
                const fechaIngreso = new Date(ingreso.fecha_ingreso);
                const fechaAlta = new Date(ingreso.fecha_alta);

                if (fechaAlta >= fechaIngreso) {
                    ingreso.setDataValue('duracion_ingreso', Math.floor((fechaAlta - fechaIngreso) / (1000 * 60 * 60 * 24)));
                }
            }
        }
    },
    /* indexes: [
        {
            unique: true,
            fields: ['historia_clinica', 'nombre_paciente', 'apellido_paciente', 'fecha_ingreso'],
        },
    ], */
});

module.exports = Ingreso;