require('dotenv').config();
const express = require('express');
require('./schemas/associations');
const { syncDatabase } = require('./config/db_sql');
const { seedDatabase } = require('./seed/seed');
const app = express();
//const host = process.env.DB_HOST || 'localhost'
const port = process.env.PORT || 5001;

if (process.env.NODE_ENV === "development") {
    //seedDatabase()
}

syncDatabase();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});






// Middlewares
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

// Logger
app.use(morgan(':method :host :status - :response-time ms :body'));

app.use(express.json()); // Habilito recepción de JSON en servidor

// Importar rutas
//API
const ingresosAPIRoutes = require("./routes/ingresos.routes");
const medicosAPIRoutes = require('./routes/medicos.routes');

//WEB


// Rutas
//API
app.use('/api/ingresos', ingresosAPIRoutes);
app.use('/api/medicos', medicosAPIRoutes);


//WEB

app.get('/', (req, res) => {
    res.send('Hello World!')
});


// Para rutas no existentes
app.use('*',error404);