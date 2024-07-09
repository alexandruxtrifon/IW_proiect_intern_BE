const {sql, poolPromise} = require('../config');


const adaugareProgramare = async (req, res) => {
    const {Cod_Masina, DataProgramare, ModalitateContact, Actiune, IntervalOrar, DurataProgramare} = req.body;

    try{
    const pool = await poolPromise;
    const request = pool.request();

    request.input('Cod_Masina', sql.Int, Cod_Masina);
    request.input('DataProgramare', sql.DateTime, DataProgramare);
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
  
module.exports = {
    adaugareProgramare
};