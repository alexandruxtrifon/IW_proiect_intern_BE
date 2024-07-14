export type Istoric2Body = {
    DataPrimire: string;//remember e datetime in sql
    ProblemeMentionate: string;
    ProblemeVizualeConstatate: string;
};

export type Istoric3Body = {
    OperatiuniEfectuate: string;
    PieseSchimbate: string;
    PieseReparate: string;
    AlteProblemeDescoperite: string;
    AlteReparatii: string;
    DurataReparatie: number;
};


export const validateIstoric2Body = (body: any): { isValid: boolean, message?: string } => {
    const { DataPrimire, ProblemeMentionate, ProblemeVizualeConstatate }: Istoric2Body = body;

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

export const validateIstoric3Body = (body: any): { isValid: boolean, message?: string } => {
    const { OperatiuniEfectuate, PieseSchimbate, PieseReparate, AlteProblemeDescoperite, AlteReparatii, DurataReparatie }: Istoric3Body = body;

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