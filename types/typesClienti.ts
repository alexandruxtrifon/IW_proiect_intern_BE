export type ClientRequestBody = {
    Nume: string;
    Prenume: string;
    Email?: string;
    NrTel?: string[];
    Activ: boolean;
}

export type ClientPatchBody = {
    Nume: string;
    Prenume: string;
    Email?: string;
}

export type ClientStatusBody = {
    Activ: boolean;
}

export const validareStatusClient = (body: any): {isValid: boolean, message?: string} => {
    const {Activ}: ClientStatusBody = body;
    const allowedFields = ['Activ'];

    for (const field in body) {
        if (!allowedFields.includes(field)) {
            return { isValid: false, message: `Nu se poate actualiza campul '${field}' în PATCH-ul clientului` };
        }
    }
    if (Activ !== undefined && typeof Activ !== 'boolean') {
        return { isValid: false, message: 'Statusul trebuie sa aiba valoarea 0/1 sau true/false' };
    }

    return { isValid: true };
}

export const validarePatchClient = (body: any): { isValid: boolean, message?: string} => {
    const {Nume, Prenume, Email}: ClientPatchBody = body;
    const allowedFields = ['Nume', 'Prenume', 'Email'];

    for (const field in body) {
        if (!allowedFields.includes(field)) {
            if(field === 'Activ') {
                return {isValid: false, message: `Schimbarea statusului nu este permisa in PATCH. Foloseste PUT`};
            } else {
                return { isValid: false, message: `Nu se poate actualiza campul '${field}' in PATCH-ul clientului` };
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
}

export const validareClient = (body: any, isUpdate = false): { isValid: boolean, message?: string } => {
    const { Nume, Prenume, Email, NrTel, Activ }: ClientRequestBody = body;

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
        if (!Array.isArray(NrTel) || NrTel.some(tel => typeof tel !== 'string')) {
            return { isValid: false, message: 'NrTel trebuie sa fie un array de string-uri' };
        }
    }
    if (!isUpdate || (Activ !== undefined)) {
        if (typeof Activ !== 'boolean') {
            return { isValid: false, message: 'Statusul trebuie sa fie un numar' };
        }
    }
    if (!isUpdate || typeof Activ !== 'boolean' && Activ !== 1 && Activ !== 0) {
        return { isValid: false, message: 'Activ trebuie sa aiba valoarea \'0\' sau \'1\' '}
    }

    return { isValid: true };
};