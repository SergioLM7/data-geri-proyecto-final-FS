require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./schemas/associations');
const { syncDatabase } = require('./config/db_sql');
const { seedDatabase } = require('./seed/seed');
const app = express();
const cookieParser = require('cookie-parser');
//const host = process.env.DB_HOST || 'localhost'
const port = process.env.PORT || 5001;

if (process.env.NODE_ENV === "development") {
    //seedDatabase()
}

syncDatabase();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.json()); // Habilito recepción de JSON en servidor
app.use(cookieParser());

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173', // Permitir solicitudes desde este origen
    credentials: true // Habilitar el envío de cookies o credenciales en las solicitudes
}));

// Middlewares
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

// Logger
app.use(morgan(':method :host :status - :response-time ms :body'));

// Importar rutas
//API
const ingresosAPIRoutes = require("./routes/ingresos.routes");
const medicosAPIRoutes = require('./routes/medicos.routes');

// Usar rutas
//API
app.use('/api/ingresos', ingresosAPIRoutes);
app.use('/api/medicos', medicosAPIRoutes);

//WEB
app.get('/', (req, res) => {
    res.send('Welcome to Data Geri API! Read the Readme for more information on how to use me.')
});

// Para rutas no existentes
app.use('*', error404);