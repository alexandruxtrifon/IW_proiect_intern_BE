const { type } = require('express/lib/response');
const {sql, poolPromise} = require('../config');

const adaugareClient = async (req, res) => {
    const {Nume, Prenume, Email, NrTel, Activ} = req.body;
    console.log(typeof Email)
    console.log(typeof NrTel)

    if (!Nume || !Prenume || !Activ) {
        return res.status(400).json({ error: 'Numele si prenumele, si statusul sunt obligatorii' });
    }
    if (!req.body.hasOwnProperty('Email') && !req.body.hasOwnProperty('NrTel')) {
        return res.status(400).json({ error: 'Trebuie sa fie furnizat cel putin un email sau un numar de telefon' });
    }
    if(typeof NrTel == 'string' && Email === undefined){
    if (!Array.isArray(NrTel) || NrTel.some(nr => typeof nr !== 'string')) {
        return res.status(400).json({ error: 'NrTel trebuie sa fie un array de string-uri.' });
    }}
    //if (typeof Activ !== 0 && Activ !== 1) {
    if (typeof Activ !== 'number'){
        return res.status(400).json({ error: 'Statusul activ trebuie sa fie un numar' });
    }

    //const telefoane = NrTel.join(',');
    const telefoane = NrTel ? NrTel.join(',') : null;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('Nume', sql.VarChar(30), Nume);
        request.input('Prenume', sql.VarChar(30), Prenume);
        request.input('Email', sql.VarChar(50), Email);
        request.input('NrTel', sql.VarChar(sql.MAX), telefoane);
        request.input('Activ', sql.Bit, Activ);
        await request.execute('InsertClient2');
        res.status(201).send({message: 'Clientul a fost adaugat cu succes'});
    } catch (err) {
        console.error(err);
        res.status(500).send({error: `${err.message}`});
    }
};

const actualizareClient = async (req, res) => {
    const {id} = req.params;
    const {Nume, Prenume, Email, NrTel, Activ} = req.body;
    const telefoane = NrTel ? NrTel.join(',') : null;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('Cod_Client', sql.Int, id);
        request.input('Nume', sql.VarChar(30), Nume || null);
        request.input('Prenume', sql.VarChar(30), Prenume || null);
        request.input('Email', sql.VarChar(50), Email || null);
        request.input('NrTel', sql.VarChar(sql.MAX), telefoane);
        request.input('Activ', sql.Bit, Activ || null);
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