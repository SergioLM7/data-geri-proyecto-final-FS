const { query, body } = require('express-validator');

const queryMedicoValidator = [
    query('email')
        .isEmail().withMessage('Debe proporcionar una dirección de correo electrónico válida')
        .isLength({ min: 6, max: 100 }).withMessage('El email debe tener entre 6 y 100 caracteres'),
];

const loginValidator = [
    body('email')
        .isEmail().withMessage('Debe proporcionar una dirección de correo electrónico válida')
        .isLength({ min: 6, max: 100 }).withMessage('El email debe tener entre 6 y 100 caracteres'),
    body('password_hash')
        .isString().withMessage('La contraseña debe ser una cadena de texto')
        .isLength({ min: 4, max: 20 }).withMessage('La contraseña debe tener entre 4 y 20 caracteres'),
];

const medicoBodyValidator = [
    body('nombre_medico')
        .isString().withMessage('Nombre del médico debe ser una cadena de texto')
        .isLength({ min: 2, max: 70 }).withMessage('Nombre del médico debe tener entre 2 y 70 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ]+$/i).withMessage('Nombre del médico solo puede contener letras'),
    body('apellido_medico')
        .isString().withMessage('Apellido del médico debe ser una cadena de texto')
        .isLength({ min: 2, max: 70 }).withMessage('Apellido del médico debe tener entre 2 y 70 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ]+$/i).withMessage('Apellido del médico solo puede contener letras'),
    body('email')
        .isEmail().withMessage('Debe proporcionar una dirección de correo electrónico válida')
        .isLength({ min: 6, max: 100 }).withMessage('El email debe tener entre 6 y 100 caracteres'),
    body('password_hash')
        .isString().withMessage('La contraseña debe ser una cadena de texto')
        .isLength({ min: 4, max: 20 }).withMessage('La contraseña debe tener entre 4 y 20 caracteres'),
    body('id_colegiado')
        .isInt().withMessage('ID Colegiado debe ser un número entero')
        .isLength({ min: 3, max: 5 }).withMessage('ID Colegiado debe tener entre 3 y 5 caracteres'),
    body('is_active')
        .optional()
        .isBoolean().withMessage('is_active debe ser un valor booleano'),
];

module.exports = {
    medicoBodyValidator,
    queryMedicoValidator,
    loginValidator
};
