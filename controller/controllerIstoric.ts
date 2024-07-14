const {sql, poolPromise} = require('../config');
import { Request, Response} from 'express';
import { Istoric2Body, Istoric3Body} from '../types/typesIstoric';


const actualizareIstoric2 = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    const {DataPrimire, ProblemeMentionate, ProblemeVizualeConstatate}: Istoric2Body = req.body;

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
        console.error(err);
        if (err instanceof Error){
        res.status(500).send({error: `eroare la actualizarea istoricului: ${err.message}`});
        } else {
            console.log('Eroare', err);
        }
    }
}

const actualizareIstoric3 = async (req: Request, res: Response) => {
    const {Cod_Istoric} = req.params;
    const {OperatiuniEfectuate, PieseSchimbate, PieseReparate, AlteProblemeDescoperite, AlteReparatii, DurataReparatie }: Istoric3Body = req.body;

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
        if (err instanceof Error){
            res.status(500).send({error: `eroare la actualizarea istoricului: ${err.message}`});
            } else {
                console.log('Eroare', err);
            }
        }
};

module.exports = {
    actualizareIstoric2,
    actualizareIstoric3
};