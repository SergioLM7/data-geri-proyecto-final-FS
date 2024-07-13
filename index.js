require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();
//const host = process.env.DB_HOST || 'localhost'
const port = process.env.PORT || 5001;

app.use(express.json()); // Habilito recepción de JSON en servidor


app.get('/', (req, res) => {
    res.send('Hello World!')
});

//El servidor va a escuchar en el port 3000 y lo va a lanzar en localhost
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
