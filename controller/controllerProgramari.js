const {sql, poolPromise} = require('../config');


const adaugareProgramare = async (req, res) => {
    const {Cod_Masina, DataProgramare, ModalitateContact, Actiune, IntervalOrar, DurataProgramare} = req.body;
    let isoDataProgramare;
    const [day, month, year] = DataProgramare.split(/[-/.]/)
    isoDataProgramare = new Date(`${month}/${day}/${year}`)

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
        res.status(500).send(`A avut loc o eroare la introducerea programarii: ${err.message}`)
    }
  };

const getProgramari = async (req, res) => {
    try {
      const pool = await poolPromise;
      const request = pool.request();

      const result = await request.execute('getProgramari');
      res.status(200).send(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send(`A avut loc o eroare la getProgramari: ${err.message}`);
    }
  }
  
module.exports = {
    adaugareProgramare,
    getProgramari
};