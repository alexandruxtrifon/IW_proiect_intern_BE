"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validareClient = exports.validarePatchClient = exports.validareStatusClient = void 0;
var validareStatusClient = function (body) {
    var Activ = body.Activ;
    var allowedFields = ['Activ'];
    for (var field in body) {
        if (!allowedFields.includes(field)) {
            return { isValid: false, message: "Nu se poate actualiza campul '".concat(field, "' \u00EEn PATCH-ul clientului") };
        }
    }
    if (Activ !== undefined && typeof Activ !== 'boolean') {
        return { isValid: false, message: 'Statusul trebuie sa aiba valoarea 0/1 sau true/false' };
    }
    return { isValid: true };
};
exports.validareStatusClient = validareStatusClient;
var validarePatchClient = function (body) {
    var Nume = body.Nume, Prenume = body.Prenume, Email = body.Email;
    var allowedFields = ['Nume', 'Prenume', 'Email'];
    for (var field in body) {
        if (!allowedFields.includes(field)) {
            if (field === 'Activ') {
                return { isValid: false, message: "Schimbarea statusului nu este permisa in PATCH. Foloseste PUT" };
            }
            else {
                return { isValid: false, message: "Nu se poate actualiza campul '".concat(field, "' in PATCH-ul clientului") };
            }
        }
    }
    if (Nume !== undefined && typeof Nume !== 'string') {
        return { isValid: false, message: 'Numele trebuie sa fie de tip string' };
    }
    if (Prenume !== undefined && typeof Prenume !== 'string') {
        return { isValid: false, message: 'Prenumele trebuie sa fie de tip string' };
    }
    if (Email !== undefined && typeof Email !== 'string') {
        return { isValid: false, message: 'Email-ul trebuie sa fie de tip string' };
    }
    return { isValid: true };
};
exports.validarePatchClient = validarePatchClient;
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