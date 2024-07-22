const { body } = require('express-validator');

const ingresoValidator = [
    body('medico_id')
        .isInt().withMessage('ID Médico debe ser un número entero'),
    body('historia_clinica')
        .isInt().withMessage('Historia Clínica debe ser un número entero'),
    body('nombre_paciente')
        .isString().withMessage('Nombre del paciente debe ser una cadena de texto')
        .isLength({ min: 2, max: 70 }).withMessage('Nombre del paciente debe tener entre 2 y 70 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i
        ).withMessage('Nombre del paciente solo puede contener letras'),
    body('apellido_paciente')
        .isString().withMessage('Apellido del paciente debe ser una cadena de texto')
        .isLength({ min: 2, max: 70 }).withMessage('Apellido del paciente debe tener entre 2 y 70 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i
        ).withMessage('Apellido del paciente solo puede contener letras'),
    body('sexo')
        .isIn(['Hombre', 'Mujer']).withMessage('Sexo debe ser Hombre o Mujer'),
    body('edad_paciente')
        .isInt({ min: 1, max: 130 }).withMessage('Edad del paciente debe estar entre 1 y 130 años'),
    body('fecha_ingreso')
        .isISO8601().withMessage('Fecha de ingreso debe ser una fecha válida')
        .isBefore(new Date().toISOString().split('T')[0]).withMessage('Fecha de ingreso no puede ser futura'),
    body('fecha_alta')
        .isISO8601().withMessage('Fecha de alta debe ser una fecha válida')
        .isBefore(new Date().toISOString().split('T')[0]).withMessage('Fecha de alta no puede ser futura'),
    body('diagnostico_principal')
        .isString().withMessage('Diagnóstico Principal debe ser una cadena de texto')
        .isLength({ min: 2, max: 100 }).withMessage('Diagnóstico Principal debe tener entre 2 y 100 caracteres'),
    body('barthel_basal')
        .isInt({ min: 0, max: 100 }).withMessage('Barthel basal debe estar entre 0 y 100'),
];

module.exports = {
    ingresoValidator,
};
