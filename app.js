const express = require('express');
const sql = require('mssql');
const config = require('./config');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

const routesClienti = require('./routes/clienti');
const routesMasini = require('./routes/masini');
const routesProgramari = require('./routes/programari');

app.use('/api/clienti', routesClienti);
app.use('/api/masini', routesMasini);

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

/*app.post('/api/post/clienti', async (req, res) => {
    const {Nume, Prenume, Email, NrTel1, NrTel2, Activ } = req.body;
    try{
        await sql.connect(config);
        const request = new sql.Request();
        request.input('Nume', sql.VarChar(30), Nume);
        request.input('Prenume', sql.VarChar(30), Prenume);
        request.input('Email', sql.VarChar(50), Email);
        request.input('NrTel1', sql.VarChar(10), NrTel1);
        request.input('NrTel2', sql.VarChar(10), NrTel2);
        request.input('Activ', sql.Bit, Activ);
        const result = await request.execute('InsertClient2');
        console.log(result);
        res.status(201).json({
            success: true,
            message: 'Clientul a fost inserat cu succes'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'A aparut o eroare la inserarea datelor ',
            error: err.message
        });
    }
});*/

app.get('/api/test', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await sql.query('SELECT 1 AS isConnected');
      res.status(200).json({
        success: true,
        data: result.recordset,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Database connection failed.',
        error: err.message,
      });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT,console.log(
    `Server started on port ${PORT}`));