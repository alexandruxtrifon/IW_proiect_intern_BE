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
    const {id} = req.params;
    const {Nume, Prenume, Email, NrTel, Activ} = req.body;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('Cod_Client', sql.Int, id);
        request.input('Nume', sql.VarChar(30), Nume);
        request.input('Prenume', sql.VarChar(30), Prenume);
        request.input('Email', sql.VarChar(50), Email);
        request.input('NrTel', sql.VarChar(sql.MAX), NrTel);
        request.input('Activ', sql.Bit, Activ);
        await request.execute('UpdateClient');
        res.status(200).json({ message: 'Clientul a fost actualizat cu succes' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'S-a produs o eroare la actualizarea clientului' });
    }
};

const dezactivareClient = async (req, res) => {
    const {id} = req.params;

    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('Cod_Client', sql.Int, id);
        await request.execute('dezactivareClient');
        res.status(200).json({ message: 'Clientul a fost dezactivat' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'S-a produs o eroare la dezactivarea clientului' });
  }
};

module.exports = {
    adaugareClient,
    actualizareClient,
    dezactivareClient
};