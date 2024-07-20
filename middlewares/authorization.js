const jwt = require('jsonwebtoken');
const Medicos = require('../schemas/medicos.schema');
require('dotenv').config();

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 
  
  console.log('Estoy accediendo al middleware');

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const medico = await Medicos.findOne({ where: { email: decoded.email } });
    
    if (!medico) {
      return res.status(404).json({ message: 'Médico no encontrado.' });
    }

    req.medico = medico.dataValues;
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Token inválido.' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado.' });
    }
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

module.exports = authenticateToken;