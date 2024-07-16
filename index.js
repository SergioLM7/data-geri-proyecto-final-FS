require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
require('./schemas/associations');
const { syncDatabase } = require('./config/db_sql');
const { seedDatabase } = require('./seed/seed');

if (process.env.NODE_ENV === "development") {
    //seedDatabase()
}


syncDatabase();



const app = express();
//const host = process.env.DB_HOST || 'localhost'
const port = process.env.PORT || 5001;

app.use(express.json()); // Habilito recepción de JSON en servidor

// Importar rutas
//API
const ingresosAPIRoutes = require("./routes/ingresos.routes");
const medicosAPIRoutes = require('./routes/medicos.routes');

//WEB


// Rutas
//API
app.use('/api', ingresosAPIRoutes);
app.use('/api/medicos', medicosAPIRoutes);


//WEB

app.get('/', (req, res) => {
    res.send('Hello World!')
});


//Sincronizo la BBDD e inicio el servidor
app.listen(port, () => {

    console.log(`Server is running on port ${port}`);
});