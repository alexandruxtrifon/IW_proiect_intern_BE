const { type } = require('express/lib/response');
const {sql, poolPromise} = require('../config');
import { Request, Response} from 'express';
import { MasiniRequestBody } from '../types/typesMasini';

const adaugareMasina = async (req: Request, res: Response): Promise<void> => {
    const { Cod_Client, NrInmatriculare, VIN, Model, AnFabr, TipMotorizare, CapacitateMotor, CP, KWh, Activ}: MasiniRequestBody = req.body;
  
    try {
        const pool = await poolPromise;
        const request = pool.request();
    
        request.input('Cod_Client', sql.Int, Cod_Client);
        request.input('NrInmatriculare', sql.VarChar(15), NrInmatriculare);
        request.input('VIN', sql.VarChar(17), VIN);
        request.input('Model', sql.VarChar(50), Model);
        request.input('AnFabr', sql.Int, AnFabr);
        request.input('TipMotorizare', sql.VarChar(20), TipMotorizare);
        request.input('CapacitateMotor', sql.Decimal(4, 1), CapacitateMotor);
        request.input('CP', sql.Int, CP);
        request.input('KWh', sql.Decimal(5, 2), KWh);
        request.input('Activ', sql.Bit, Activ);
    
        await request.execute('adaugareMasina');
        res.status(201).send({ message: 'Masina a fost adaugata' });
      } catch (err) {
        console.error(err);
        if (err instanceof Error){
            res.status(500).send({error: `A avut loc o eroare: ${err.message}`});
            } else {
              console.log(err);
            }
        }
};

const actualizareMasina = async (req: Request, res: Response): Promise<void> => {
  const {id} = req.params;
  const {Cod_Client, NrInmatriculare, VIN, Model, AnFabr, TipMotorizare, CapacitateMotor, CP, KWh, Activ}: MasiniRequestBody = req.body;
  try {
    const pool = await poolPromise;
    const request = pool.request();

    request.input('Cod_Masina', sql.Int, id);
    request.input('Cod_Client', sql.Int, Cod_Client || null);
    request.input('NrInmatriculare', sql.VarChar(15), NrInmatriculare || null);
    request.input('VIN', sql.VarChar(17), VIN || null);
    request.input('Model', sql.VarChar(50), Model || null);
    request.input('AnFabr', sql.Int, AnFabr || null);
    request.input('TipMotorizare', sql.VarChar(20), TipMotorizare || null);
    request.input('CapacitateMotor', sql.Decimal(4, 1), CapacitateMotor || null);
    request.input('CP', sql.Int, CP || null);
    request.input('KWh', sql.Decimal(5, 2), KWh || null);
    request.input('Activ', sql.Bit, Activ || null);

    await request.execute('actualizareMasina');
    res.status(201).send({ message: 'Masina a fost actualizata' });
  } catch (err) {
    console.error(err);
    if (err instanceof Error){
        res.status(500).send({error: `A avut loc o eroare: ${err.message}`});
        } else {
          console.log(err);
        }
  }
};

const dezactivareMasina = async (req: Request, res:Response) => {
  const {id} = req.params;

  try {
    const pool = await poolPromise;
    const request = pool.request();

    request.input('Cod_Masina', sql.Int, id);

    await request.execute('DezactivareMasina');
    res.status(200).json({ message: 'Masina a fost dezactivata' });
} catch (err) {
    console.error(err);
    if (err instanceof Error){
        res.status(500).send({error: `A avut loc o eroare: ${err.message}`});
        } else {
          console.log(err);
        }
}
};

const getMasini = async (req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    const result = await request.execute('getMasini');
    res.status(200).send(result.recordset);
  } catch (err) {
    console.error(err);
    if (err instanceof Error){
        res.status(500).send({error: `A avut loc o eroare: ${err.message}`});
        } else {
          console.log(err);
        }
  }
}

module.exports = {
    adaugareMasina,
    actualizareMasina,
    dezactivareMasina,
    getMasini
};