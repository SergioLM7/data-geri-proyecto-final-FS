const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db_sql');


const Medico = sequelize.define('Medico', {
    medico_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_medico: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    apellido_medico: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    id_colegiado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
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