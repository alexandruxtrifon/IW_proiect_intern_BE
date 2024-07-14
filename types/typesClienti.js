"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validareClient = void 0;
var validareClient = function (body, isUpdate) {
    if (isUpdate === void 0) { isUpdate = false; }
    var Nume = body.Nume, Prenume = body.Prenume, Email = body.Email, NrTel = body.NrTel, Activ = body.Activ;
    if (!isUpdate || (Nume !== undefined)) {
        if (typeof Nume !== 'string') {
            return { isValid: false, message: 'Numele este obligatoriu si trebuie sa fie de tip string' };
        }
    }
    if (!isUpdate || (Prenume !== undefined)) {
        if (typeof Prenume !== 'string') {
            return { isValid: false, message: 'Prenumele este obligatoriu si trebuie sa fie de tip string' };
        }
    }
    if (!isUpdate || (Email !== undefined)) {
        if (typeof Email !== 'string') {
            return { isValid: false, message: 'Email-ul trebuie sa fie de tip string si sa respecte formatul unui email' };
        }
    }
    if (!isUpdate || (NrTel !== undefined)) {
        if (!Array.isArray(NrTel) || NrTel.some(function (tel) { return typeof tel !== 'string'; })) {
            return { isValid: false, message: 'NrTel trebuie sa fie un array de string-uri' };
        }
    }
    if (!isUpdate || (Activ !== undefined)) {
        if (typeof Activ !== 'boolean') {
            return { isValid: false, message: 'Statusul trebuie sa fie un numar' };
        }
    }
    if (!isUpdate || typeof Activ !== 'boolean' && Activ !== 1 && Activ !== 0) {
        return { isValid: false, message: 'Activ trebuie sa aiba valoarea \'0\' sau \'1\' ' };
    }
    return { isValid: true };
};
exports.validareClient = validareClient;
//# sourceMappingURL=typesClienti.js.map