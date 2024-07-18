const jwt = require('jsonwebtoken');
const Medicos= require('../schemas/medicos.schema');
const dotenv = require('dotenv');
dotenv.config();

const authenticateToken = async (req, res, next) => {
  const token = req.cookies['access-token'];

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const medico = await Medicos.findOne({ where: { email: decoded.email } });

    if (!medico) {
      throw new Error('Médico no encontrado.');
    }

    req.medico = medico;
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    return res.status(403).json({ message: 'Acceso no autorizado. Token inválido.' });
  }
};

module.exports = authenticateToken;