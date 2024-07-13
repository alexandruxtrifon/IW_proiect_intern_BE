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







app.get('/api/contact', async (req, res) => { 
    try{
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM ClientContactInfo');
        res.status(200).json({
            success: true,
            data: result.recordset
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'A aparut o eroare ',
            error: err.message
        });
    }

}) ;

