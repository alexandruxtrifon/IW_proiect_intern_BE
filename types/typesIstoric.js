"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIstoric3Body = exports.validateIstoric2Body = void 0;
var validateIstoric2Body = function (body) {
    var DataPrimire = body.DataPrimire, ProblemeMentionate = body.ProblemeMentionate, ProblemeVizualeConstatate = body.ProblemeVizualeConstatate;
    if (!DataPrimire || typeof DataPrimire !== 'string') {
        return { isValid: false, message: 'DataPrimire este obligatorie si trebuie sa fie de tip string' };
    }
    if (!ProblemeMentionate || typeof ProblemeMentionate !== 'string') {
        return { isValid: false, message: 'ProblemeMentionate este obligatoriu si trebuie sa fie de tip string' };
    }
    if (!ProblemeVizualeConstatate || typeof ProblemeVizualeConstatate !== 'string') {
        return { isValid: false, message: 'ProblemeVizualeConstatate este obligatoriu si trebuie sa fie de tip string' };
    }
    return { isValid: true };
};
exports.validateIstoric2Body = validateIstoric2Body;
var validateIstoric3Body = function (body) {
    var OperatiuniEfectuate = body.OperatiuniEfectuate, PieseSchimbate = body.PieseSchimbate, PieseReparate = body.PieseReparate, AlteProblemeDescoperite = body.AlteProblemeDescoperite, AlteReparatii = body.AlteReparatii, DurataReparatie = body.DurataReparatie;
    if (!OperatiuniEfectuate || typeof OperatiuniEfectuate !== 'string') {
        return { isValid: false, message: 'OperatiuniEfectuate este obligatoriu si trebuie sa fie de tip string' };
    }
    if (!PieseSchimbate || typeof PieseSchimbate !== 'string') {
        return { isValid: false, message: 'PieseSchimbate este obligatoriu si trebuie sa fie de tip string' };
    }
    if (!PieseReparate || typeof PieseReparate !== 'string') {
        return { isValid: false, message: 'PieseReparate este obligatoriu si trebuie sa fie de tip string' };
    }
    if (!AlteProblemeDescoperite || typeof AlteProblemeDescoperite !== 'string') {
        return { isValid: false, message: 'AlteProblemeDescoperite este obligatoriu si trebuie sa fie de tip string' };
    }
    if (!AlteReparatii || typeof AlteReparatii !== 'string') {
        return { isValid: false, message: 'AlteReparatii este obligatoriu si trebuie sa fie de tip string' };
    }
    if (!DurataReparatie || typeof DurataReparatie !== 'number') {
        return { isValid: false, message: 'DurataReparatie este obligatorie si trebuie sa fie de tip number' };
    }
    return { isValid: true };
};
exports.validateIstoric3Body = validateIstoric3Body;
//# sourceMappingURL=typesIstoric.js.map