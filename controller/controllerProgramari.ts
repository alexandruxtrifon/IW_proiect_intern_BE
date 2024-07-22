const {sql, poolPromise} = require('../config');
import { formatProgramari, Programare, ProgramareRequestBody, validareProgramare } from "../types/typesProgramari";
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

const execGetProgramariQuery = async (req: Request, res: Response): Promise<void> => {
    try {
      const pool = await poolPromise;
      const request = pool.request();
      
      let query = `
          SELECT
                CONCAT(c.Nume, ' ', c.Prenume) AS NumeClient, m.Model AS ModelMasina, m.NrInmatriculare, p.DataProgramare, p.ModalitateContact, p.Actiune, p.IntervalOrar, \
              p.DurataProgramare FROM Programari p JOIN Masini m ON p.Cod_Masina = m.Cod_Masina JOIN Clienti c ON m.Cod_Client = c.Cod_Client`;
  
      const { dataprogramare, ...queryParams } = req.query;
      const cond: string[] = [];
  
      const formatDate = (dateString: string, isEndDate: boolean = false): string => {
          const parts = dateString.split(/[-/.]/);
          if (parts.length === 3){
            const [day, month, year] = parts;
            return `${year}-${month}-${day}`;
          } else if (parts.length === 2) {
            const [month, year] = parts;
            const lastDay = new Date(Number(year), Number(month), 0).getDate();
            return isEndDate ? `${year}-${month}-${lastDay}`: `${year}-${month}-01`;
          } else if (parts.length === 1) {
            const [year] = parts;
            return isEndDate ? `${year}-12-31` : `${year}-01-01`;
          } else {
            throw new Error('Formatul datei este invalid. Foloseste DD/MM/YYYY, MM/YYYY sau YYYY');
          }

      };
  
      if (typeof dataprogramare === 'string') {
          const [startDate, endDate] = dataprogramare.split('to').map(d => d.trim());
  
          if (startDate && endDate) {
              const formattedStartDate = formatDate(startDate);
              const formattedEndDate = formatDate(endDate, true);
              //console.log(formattedStartDate);
              //console.log(formattedEndDate);
              cond.push(`p.DataProgramare BETWEEN @StartDate AND @EndDate`);
              request.input('StartDate', sql.Date, formattedStartDate);
              request.input('EndDate', sql.Date, formattedEndDate);
          } else {
              const formattedDate = formatDate(startDate);
              cond.push(`p.DataProgramare = @Date`);
              request.input('Date', sql.Date, formattedDate);
          }
      }
      for (const [key, value] of Object.entries(queryParams)) {
          if (typeof value === 'string') {
              cond.push(`${key} LIKE @${key}`);
              request.input(key, sql.VarChar, `%${value}%`);
          }
      }
  
      if (cond.length > 0) {
          query += ' WHERE ' + cond.join(' AND ');
      }
  
      const result = await request.query(query);
      const formattedResults = formatProgramari(result.recordset);
      res.status(200).json(formattedResults);
  } catch (err) {
      console.error(err);
      if (err instanceof Error){
      res.status(500).send(`eroare la cautarea programarilor: ${err.message}`);
      } else {
      console.log(err);
      }
  }
}

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
    getProgramariData,
    execGetProgramariQuery
  };