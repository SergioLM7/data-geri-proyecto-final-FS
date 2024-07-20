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
        validate: {
            isInt: { msg: 'ID Médico debe ser un número entero' },
            notNull: { msg: 'ID Médico es necesario' },
        }
    },
    historia_clinica: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Historia Clínica debe ser un número entero' },
            notNull: { msg: 'Historia Clínica es necesaria' },
        }
    },
    nombre_paciente: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            len: [2, 70],
            notNull: { msg: 'Nombre del paciente es necesario' },
            notEmpty: { msg: 'Nombre del paciente no puede estar vacío' },
            isAlpha: { msg: 'Nombre del paciente solo puede contener letras' },
        }
    },
    apellido_paciente: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            len: [2, 70], 
            notNull: { msg: 'Apellido del paciente es necesario' },
            notEmpty: { msg: 'Apellido del paciente no puede estar vacío' },
            isAlpha: { msg: 'Apellido del paciente solo puede contener letras' },
        }
    },
    sexo: {
        type: DataTypes.STRING(7),
        allowNull: false,
        validate: {
            len: [1, 7],
            notNull: { msg: 'Sexo es necesario' },
            isIn: {
                args: [['Hombre', 'Mujer']],
                msg: 'Sexo debe ser Hombre o Mujer'
            },
        }
    },
    edad_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Edad del paciente debe ser un número entero' },
            min: {
                args: [1],
                msg: 'Edad del paciente debe ser al menos 1'
            },
            max: {
                args: [130],
                msg: 'Edad del paciente no puede ser mayor a 130'
            },
            notNull: { msg: 'Edad del paciente es necesaria' },
        }
    },
    fecha_ingreso: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: { msg: 'Fecha de ingreso debe ser una fecha válida' },
            notNull: { msg: 'Fecha de ingreso es necesaria' },
            isBefore: {
                args: [new Date().toISOString().split('T')[0]],
                msg: 'Fecha de ingreso no puede ser futura'
            }
        }
    },
    fecha_alta: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: { msg: 'Fecha de alta debe ser una fecha válida' },
            notNull: { msg: 'Fecha de alta es necesaria' },
            isBefore: {
                args: [new Date().toISOString().split('T')[0]],
                msg: 'Fecha de alta no puede ser futura'
            }
        }
    },
    duracion_ingreso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Duración de ingreso debe ser un número entero' },
            min: {
                args: [0],
                msg: 'Duración de ingreso debe ser al menos 0'
            },
            notNull: { msg: 'Duración de ingreso es necesario' },
        }
    },
    diagnostico_principal: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [2, 100],
            notNull: { msg: 'Diagnóstico Principal es necesario' },
            notEmpty: { msg: 'Diagnóstico Principal no puede estar vacío' },
        }
    },
    barthel_basal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Barthel basal debe ser un número entero' },
            min: {
                args: [0],
                msg: 'Barthel basal debe ser al menos 0'
            },
            max: {
                args: [100],
                msg: 'Barthel basal no puede ser mayor a 100'
            },
            notNull: { msg: 'Barthel basal es necesario' },
        }
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