const {sql, poolPromise} = require('../config');

const actualizareIstoric2 = async (req, res) => {
    const {id} = req.params;
    const {DataPrimire, ProblemeMentionate, ProblemeVizualeConstatate} = req.body;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('Cod_Istoric', sql.Int, id);
        request.input('DataPrimire', sql.DateTime, DataPrimire);
        request.input('ProblemeMentionate', sql.VarChar(499), ProblemeMentionate);
        request.input('ProblemeVizualeConstatate', sql.VarChar(499), ProblemeVizualeConstatate);

        await request.execute('updateIstoricServiceStatus2');
        res.status(200).send('Istoricul a fost actualizat.');
    } catch (err) {
        res.status(400).send(`A aparut o eroare la actualizarea istoricului: ${err.message}`);
    }
}

const actualizareIstoric3 = async (req, res) => {
    const {Cod_Istoric} = req.params;
    const {OperatiuniEfectuate, PieseSchimbate, PieseReparate, AlteProblemeDescoperite, AlteReparatii, DurataReparatie } = req.body;

    try {
    const pool = await poolPromise;
    const request = pool.request();

    request.input('Cod_Istoric', sql.Int, Cod_Istoric);
    request.input('OperatiuniEfectuate', sql.VarChar(499), OperatiuniEfectuate);
    request.input('PieseSchimbate', sql.VarChar(499), PieseSchimbate);
    request.input('PieseReparate', sql.VarChar(499), PieseReparate);
    request.input('AlteProblemeDescoperite', sql.VarChar(499), AlteProblemeDescoperite);
    request.input('AlteReparatii', sql.VarChar(499), AlteReparatii);
    request.input('DurataReparatie', sql.Int, DurataReparatie);

    await request.execute('updateIstoricServiceStatus3');
    res.status(200).send('Istoricul a fost actualizat.');
    } catch (err) {
        res.status(400).send(`A aparut o eroare la actualizarea istoricului: ${err.message}`)}
};

module.exports = {
    actualizareIstoric2,
    actualizareIstoric3
};