const { type } = require('express/lib/response');
const {sql, poolPromise} = require('../config');
import { Request, Response} from 'express';
import { ClientPatchBody, ClientRequestBody, validareClient } from '../types/typesClienti';

export const adaugareClient = async (req: Request, res: Response): Promise<void> => {
    const {Nume, Prenume, Email, NrTel, Activ}:ClientRequestBody = req.body;

    const validare = validareClient(req.body);
    if (!validare.isValid) {
        res.status(400).json({ error: validare.message });
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
            console.log('eroare:', err);
        }
    }
};

const actualizareClient = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    const {Nume, Prenume, Email/*, NrTel, Activ*/}:ClientPatchBody = req.body;
    //const telefoane = NrTel ? NrTel.join(',') : null;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('Cod_Client', sql.Int, id);
        request.input('Nume', sql.VarChar(30), Nume || null);
        request.input('Prenume', sql.VarChar(30), Prenume || null);
        request.input('Email', sql.VarChar(50), Email || null);
        //request.input('NrTel', sql.VarChar(sql.MAX), telefoane);
        //request.input('Activ', sql.Bit, Activ || null);
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

const execStatusClient = async (req: Request, res: Response, procedureName: string, mesaj: string): Promise<void> => {
    const {id} = req.params;
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('Cod_Client', sql.Int, id);
        const result = await request.execute(procedureName);
        res.status(200).json({ message: mesaj });

    } catch (err) {
        console.error(err);
        if (err instanceof Error){
        res.status(500).send(`A avut loc o eroare: ${err.message}`);
        } else {
          console.log(err);
        }
    } 
};

const dezactivareClient = async (req: Request, res: Response): Promise<void> => {
    await execStatusClient(req, res, 'dezactivareClient', 'Clientul a fost dezactivat');
};
const activareClient = async (req: Request, res: Response): Promise<void> => {
    await execStatusClient(req, res, 'activareClient', 'Clientul a fost activat');
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
            res.status(500).send(`A avut loc o eroare la executarea procedurii ${procedureName}: ${err.message}`);
        } else {
          console.log(err);
        }
    }
};

const execGetTelefoane = async (req: Request, res: Response, procedureName: string): Promise<void> => {
    const {id} = req.params;

    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('Cod_Client', sql.Int, id);
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

const execActualizareTelefonClient = async (req: Request, res: Response, procedureName: string): Promise<void> => {
    const {idClient, idTelefon} = req.params;
    const {NrTel} = req.body;
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('Cod_Client', sql.Int, idClient);
        request.input('Cod_Telefon', sql.Int, idTelefon);
        request.input('NrTel', sql.VarChar(50), NrTel);

        const result = await request.execute(procedureName);
        //res.status(200).send(result.recordset);
        res.status(200).json({ message: 'Telefonul a fost actualizat' });

    } catch (err) {
        console.error(err);
        if (err instanceof Error){
        res.status(500).send(`A avut loc o eroare: ${err.message}`);
        } else {
          console.log(err);
        }
    } 
};

const getClienti = async (req: Request, res: Response): Promise<void> => {
        await execGetClienti(req, res, 'getClientiInternal');
    }


const getClientiActivi = async (req: Request, res: Response): Promise<void> => {
    await execGetClienti(req, res, 'getClientiActivi');
    }

const getClientiInactivi = async (req: Request, res: Response): Promise<void> => {
    await execGetClienti(req, res, 'getClientiInactivi');
    }

const getTelefonClient = async (req: Request, res: Response): Promise<void> => {
    //const {id} = req.params;
    await execGetTelefoane(req, res, 'getTelefoaneClient');
}

const actualizareTelefonClient = async (req: Request, res: Response): Promise<void> => {
    await execActualizareTelefonClient(req, res, 'actualizareTelefonClient');
}


module.exports = {
    adaugareClient,
    actualizareClient,
    dezactivareClient,
    getClienti,
    getClientiActivi,
    getClientiInactivi,
    getTelefonClient,
    actualizareTelefonClient,
    activareClient
};