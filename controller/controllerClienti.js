const {sql, poolPromise} = require('../config');

const adaugareClient = async (req, res) => {
    const {Nume, Prenume, Email, NrTel1, NrTel2, Activ} = req.body;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('Nume', sql.VarChar(30), Nume);
        request.input('Prenume', sql.VarChar(30), Prenume);
        request.input('Email', sql.VarChar(50), Email);
        request.input('NrTel1', sql.VarChar(10), NrTel1);
        request.input('NrTel2', sql.VarChar(10), NrTel2);
        request.input('Activ', sql.Bit, Activ);
        const result = await request.execute('InsertClient2');
        res.status(201).json({message: 'Clientul a fost adaugat cu succes'});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'A crapat ceva cand adaugam clientul'});
    }
};

module.exports = {
    adaugareClient
};