const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db_sql');


const Medico = sequelize.define('Medico', {
    medico_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_medico: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            len: [2, 70],
            notNull: { msg: 'Nombre del médico es necesario' },
            notEmpty: { msg: 'Nombre del médico no puede estar vacío' },
            matches: {
                args: [/^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i],
                msg: 'Nombre del paciente solo puede contener letras, espacios, apóstrofos y guiones'
            }
        }
    },
    apellido_medico: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            len: [2, 70],
            notNull: { msg: 'Apellido del médico es necesario' },
            notEmpty: { msg: 'Apellido del médico no puede estar vacío' },
            matches: {
                args: [/^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i],
                msg: 'Nombre del paciente solo puede contener letras, espacios, apóstrofos y guiones'
            }
        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
            args: true,
            msg: 'El email ya está registrado'
        },
        validate: {
            isEmail: { msg: 'Debe proporcionar una dirección de correo electrónico válida' },
            len: {
                args: [6, 100],
                msg: 'El email debe tener entre 6 y 100 caracteres'
            },
            notNull: { msg: 'El email es necesario' },
            notEmpty: { msg: 'El email no puede estar vacío' }
        }
    },
    password_hash: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            len: {
                args: [4, 200],
                msg: 'La contraseña hasheada debe tener entre 4 y 200 caracteres'
            },
            notNull: { msg: 'La contraseña es necesaria' },
            notEmpty: { msg: 'La contraseña no puede estar vacía' }
        }
    },
    id_colegiado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 5],
            isInt: { msg: 'ID Médico debe ser un número entero' },
            notNull: { msg: 'ID Médico es necesario' },
        }
    },
    rol: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'user',
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    is_logged: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    last_time_logged: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'medicos',
    timestamps: false,
});



module.exports = Medico;