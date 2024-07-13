const express = require('express');
const sql = require('mssql');
const config = require('./config');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

const routesClienti = require('./routes/clienti');
const routesMasini = require('./routes/masini');
const routesProgramari = require('./routes/programari');
const routesIstoric = require('./routes/istoric');

app.use('/api/clienti', routesClienti);
app.use('/api/masini', routesMasini);
app.use('/api/programari', routesProgramari);
app.use('/api/istoric', routesIstoric);


const PORT = process.env.PORT || 3000;
app.listen(PORT,console.log(
    `Server started on port ${PORT}`));
