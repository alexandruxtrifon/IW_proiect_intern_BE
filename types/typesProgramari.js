"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validareProgramare = void 0;
var validareProgramare = function (body) {
    var Cod_Masina = body.Cod_Masina, DataProgramare = body.DataProgramare, ModalitateContact = body.ModalitateContact, Actiune = body.Actiune, IntervalOrar = body.IntervalOrar, DurataProgramare = body.DurataProgramare;
    if (typeof Cod_Masina !== 'number') {
        return { isValid: false, message: 'Cod_Masina este obligatoriu si trebuie sa fie de tip numar' };
    }
    if (typeof DataProgramare !== 'string') {
        return { isValid: false, message: 'DataProgramare trebuie sa fie de tip string in formatul DD-MM-YYYY' };
    }
    if (typeof ModalitateContact !== 'string') {
        return { isValid: false, message: 'ModalitateContact este obligatoriu si trebuie să fie de tip string' };
    }
    if (typeof Actiune !== 'string') {
        return { isValid: false, message: 'Actiune este obligatorie si trebuie sa fie de tip string' };
    }
    if (typeof IntervalOrar !== 'string') {
        return { isValid: false, message: 'IntervalOrar este obligatoriu si trebuie sa fie de tip string' };
    }
    if (typeof DurataProgramare !== 'number') {
        return { isValid: false, message: 'DurataProgramare este obligatorie si trebuie sa fie de tip numar' };
    }
    return { isValid: true };
};
exports.validareProgramare = validareProgramare;
//# sourceMappingURL=typesProgramari.js.map