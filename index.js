require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const seedDatabase = require('./seed/seed');


const app = express();
//const host = process.env.DB_HOST || 'localhost'
const port = process.env.PORT || 5001;


/*if (process.env.NODE_ENV !== 'production') {
    seedDatabase;
}*/

app.use(express.json()); // Habilito recepción de JSON en servidor


app.get('/', (req, res) => {
    res.send('Hello World!')
});

//El servidor se escuchar en el puerto 5001 o en el que se establezca en las variables de entorno
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
