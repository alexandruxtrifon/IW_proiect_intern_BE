const {sql, poolPromise} = require('../config');
import { ProgramareRequestBody, validareProgramare } from "../types/typesProgramari";
import { Request, Response} from 'express';


const adaugareProgramare = async (req: Request, res: Response): Promise<void> => {
    const {Cod_Masina, DataProgramare, ModalitateContact, Actiune, IntervalOrar, DurataProgramare}: ProgramareRequestBody = req.body;
    let isoDataProgramare;
    const [day, month, year] = DataProgramare.split(/[-/.]/)
    isoDataProgramare = new Date(`${month}/${day}/${year}`)

    const validare = validareProgramare(req.body);
    if (!validare.isValid) {
        res.status(400).json({ error: validare.message });
        return;
    }
    try{
    const pool = await poolPromise;
    const request = pool.request();

    request.input('Cod_Masina', sql.Int, Cod_Masina);
    request.input('DataProgramare', sql.DateTime, isoDataProgramare);
    request.input('ModalitateContact', sql.VarChar(15), ModalitateContact);
    request.input('Actiune', sql.VarChar(255), Actiune);
    request.input('IntervalOrar', sql.VarChar(5), IntervalOrar);
    request.input('DurataProgramare', sql.Int, DurataProgramare);

    await request.execute('adaugaProgramare');
    res.status(200).send('Programarea a fost adaugata si s-a creat inregistrarea in istoric');
    } catch (err) {
      if (err instanceof Error){
        res.status(500).send({error: `eroare la introducerea programarii: ${err.message}`});
        } else {
          console.log(err);
        }
    }
  };

const execGetProgramari = async (req: Request, res: Response, procedureName: string, params?: { name: string, type: any, value: any }[]): Promise<void> => {
  try {
    const pool = await poolPromise;
    const request = pool.request();

    if (params) {
      params.forEach(param => {
          request.input(param.name, param.type, param.value);
      });
  }
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
}

const getProgramari = async (req: Request, res: Response): Promise<void> => { 
    await execGetProgramari(req, res, 'getProgramari');
  }
const getProgramariData = async (req: Request, res: Response): Promise<void> => { 
    const { dataProgramare } = req.params;
  
    let params = [];
    if (dataProgramare) {
        const [day, month, year] = dataProgramare.split(/[-/.]/);
        const formattedDate = `${year}-${month}-${day}`;
        params.push({ name: 'DataProgramare', type: sql.Date, value: formattedDate });
    }

    await execGetProgramari(req, res, 'getProgramari', params);
}
  
module.exports = {
    adaugareProgramare,
    getProgramari,
    getProgramariData
};