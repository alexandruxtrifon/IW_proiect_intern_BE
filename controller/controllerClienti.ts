const { type } = require('express/lib/response');
const {sql, poolPromise} = require('../config');
import { Request, Response} from 'express';
import { ClientRequestBody } from '../types/typesClienti';

export const adaugareClient = async (req: Request, res: Response): Promise<void> => {
    const {Nume, Prenume, Email, NrTel, Activ}:ClientRequestBody = req.body;
    //console.log(typeof Email)
    //console.log(typeof NrTel)

    if (!Nume || !Prenume || !Activ === undefined) {
        res.status(400).json({ error: 'Numele, prenumele, si statusul sunt obligatorii' });
        return;
    }
    if (typeof Activ !== 'boolean' && Activ !== 1 && Activ !== 0) {
        res.status(400).json({ error: 'Statusul trebuie sa fie  0/1.' });
        return;
    }
    if (!Email && (!Array.isArray(NrTel) || NrTel.length === 0)) {
        res.status(400).json({ error: 'Trebuie sa fie furnizat cel putin un email sau un numar de telefon.' });
        return;
    }
    if (NrTel && (!Array.isArray(NrTel) || NrTel.some((nr) => typeof nr !== 'string'))) {
        res.status(400).json({ error: 'NrTel trebuie să fie un array de string-uri.' });
        return;
    }

    if (!req.body.hasOwnProperty('Email') && !req.body.hasOwnProperty('NrTel')) {
        res.status(400).json({ error: 'Trebuie sa fie furnizat cel putin un email sau un numar de telefon' });
        return;
    }
    /*if(typeof NrTel == 'string' && Email === undefined){
    if (!Array.isArray(NrTel) || NrTel.some((nr: any) => typeof nr !== 'string')) {
        res.status(400).json({ error: 'NrTel trebuie sa fie un array de string-uri.' });
        return;
    }}*/
    //if (typeof Activ !== 0 && Activ !== 1) {
    /*if (typeof Activ !== 'number'){
        res.status(400).send('Statusul activ trebuie sa fie un numar' );
        return;
    }*/


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
        if (err instanceof Error){
        res.status(500).send({error: `${err.message}`});
        } else {
            console.log('Eroare', err);
        }
    }
};

const actualizareClient = async (req: Request, res: Response): Promise<void> => {
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
      if (err instanceof Error){
        res.status(500).send({error: `A avut loc o eroare: ${err.message}`});
        } else {
          console.log(err);
        }
    }
};

const dezactivareClient = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;

    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('Cod_Client', sql.Int, id);
        await request.execute('dezactivareClient');
        res.status(200).json({ message: 'Clientul a fost dezactivat' });
  } catch (err) {
    console.error(err);
    if (err instanceof Error){
        res.status(500).send(`A avut loc o eroare: ${err.message}`);
        } else {
          console.log(err);
        }
    }
};

const execGetClienti = async (req: Request, res: Response, procedureName: string) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.execute(procedureName);
        res.status(200).send(result.recordset);
    } catch (err) {
        console.error(err);
        if (err instanceof Error){
        res.status(500).send(`A avut loc o eroare: ${err.message}`);
        } else {
          console.log(err);
        }
    }
};

const getClienti = async (req: Request, res: Response) => {
        execGetClienti(req, res, 'getClientiInternal');
    }


const getClientiActivi = async (req: Request, res: Response) => {
    execGetClienti(req, res, 'getClientiActivi');
    }

const getClientiInactivi = async (req: Request, res: Response) => {
    execGetClienti(req, res, 'getClientiInactivi');
    }


module.exports = {
    adaugareClient,
    actualizareClient,
    dezactivareClient,
    getClienti,
    getClientiActivi,
    getClientiInactivi
};