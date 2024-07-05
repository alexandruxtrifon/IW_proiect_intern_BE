const {sql, poolPromise} = require('../config');

const adaugareClient = async (req, res) => {
    const {Nume, Prenume, Email, NrTel, Activ} = req.body;
    const telefoane = NrTel.join(',');

    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('Nume', sql.VarChar(30), Nume);
        request.input('Prenume', sql.VarChar(30), Prenume);
        request.input('Email', sql.VarChar(50), Email);
        request.input('NrTel', sql.VarChar(sql.MAX), telefoane);
        request.input('Activ', sql.Bit, Activ);
        await request.execute('InsertClient2');
        res.status(201).json({message: 'Clientul a fost adaugat cu succes'});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'A crapat ceva cand adaugam clientul'});
    }
};

const actualizareClient = async (req, res) => {
  //  const {Nume, Prenume, Email}
}

module.exports = {
    adaugareClient,
    actualizareClient

};