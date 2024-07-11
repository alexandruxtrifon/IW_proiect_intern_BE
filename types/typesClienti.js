"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validateClientRequestBody = function (body) {
    if (typeof body.Nume !== 'string' || body.Nume.length === 0) {
        throw new Error('Nume trebuie să fie un string ne-gol.');
    }
    if (typeof body.Prenume !== 'string' || body.Prenume.length === 0) {
        throw new Error('Prenume trebuie să fie un string ne-gol.');
    }
    if (typeof body.Email !== 'string' || body.Email.length === 0) {
        throw new Error('Email trebuie să fie un string ne-gol.');
    }
    if (!Array.isArray(body.NrTel) || body.NrTel.some(function (nr) { return typeof nr !== 'string'; })) {
        throw new Error('NrTel trebuie să fie un array de string-uri.');
    }
    if (typeof body.Activ !== 'boolean') {
        throw new Error('Activ trebuie să fie un boolean.');
    }
    return true;
};
