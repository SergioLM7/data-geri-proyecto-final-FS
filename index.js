require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./schemas/associations');
const { syncDatabase } = require('./config/db_sql');
const { seedDatabase } = require('./seed/seed');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5001;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

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
    origin: 'https://data-geri-web.onrender.com', // Permitir solicitudes desde este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
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
const statsAPIRoutes = require('./routes/stats.routes');


// Usar rutas
//API
app.use('/api/ingresos', ingresosAPIRoutes);
app.use('/api/medicos', medicosAPIRoutes);
app.use('/api/stats', statsAPIRoutes);


//WEB
app.get('/', (req, res) => {
    res.send('Welcome to Data Geri API! Read the Readme for more information on how to use me.')
});

//Documentación JSDoc
app.use('/api-jsdoc', express.static(path.join(__dirname, '/jsondocs')));
//Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Para rutas no existentes
app.use('*', error404);