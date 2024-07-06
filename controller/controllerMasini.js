const {sql, poolPromise} = require('../config');

const adaugareMasina = async (req, res) => {
    const { Cod_Client, Cod_Marca, NrInmatriculare, VIN, Model, AnFabr, TipMotorizare, CapacitateMotor, CH, KWh, Activ} = req.body;
  
    try {
        const pool = await poolPromise;
        const request = pool.request();
    
        request.input('Cod_Client', sql.Int, Cod_Client);
        request.input('Cod_Marca', sql.Int, Cod_Marca);
        request.input('NrInmatriculare', sql.VarChar(15), NrInmatriculare);
        request.input('VIN', sql.VarChar(17), VIN);
        request.input('Model', sql.VarChar(50), Model);
        request.input('AnFabr', sql.Int, AnFabr);
        request.input('TipMotorizare', sql.VarChar(20), TipMotorizare);
        request.input('CapacitateMotor', sql.Decimal(4, 1), CapacitateMotor);
        request.input('CP', sql.Int, CP);
        request.input('KWh', sql.Decimal(5, 2), KWh);
        request.input('Activ', sql.Bit, Activ);
    
        await request.execute('insertMasina');
        res.status(201).json({ message: 'Masina a fost adaugata' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'A avut loc o eroare la adaugarea masinii' });
      }
};

const actualizareMasina = async (req, res) => {

};

const dezactivareMasina = async (req, res) => {

};

module.exports = {
    adaugareMasina,
    actualizareMasina,
    dezactivareMasina
};