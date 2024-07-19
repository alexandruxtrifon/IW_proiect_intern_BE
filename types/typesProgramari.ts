import moment = require("moment");

export type ProgramareRequestBody = {
    Cod_Masina: number;
    DataProgramare: string;
    ModalitateContact: string;
    Actiune: string;
    IntervalOrar: string;
    DurataProgramare: number;
};

export type Programare = {
    NumeClient: string;
    DataProgramare: string;
    ModalitateContact: string;
    Actiune: string;
    IntervalOrar: string;
    DurataProgramare: number;
    Model: string;
    NrInmatriculare: string;
}

export type FormattedProgramare = {
    NumeClient: string;
    DataProgramare: string;
    ModalitateContact: string;
    Actiune: string;
    IntervalOrar: string;
    DurataProgramare: number;
    ModelMasina: string;
    NrInmatriculare: string;
}

export const formatProgramari = (programari: Programare[]): FormattedProgramare[] => {
    return programari.map(programare => ({
        NumeClient: programare.NumeClient,
        DataProgramare: moment(programare.DataProgramare).format('DD/MM/YYYY'),
        ModalitateContact: programare.ModalitateContact,
        Actiune: programare.Actiune,
        IntervalOrar: `${moment(programare.IntervalOrar).format('HH:mm')} - ${moment(programare.IntervalOrar).add(programare.DurataProgramare, 'minutes').format('HH:mm')}`,
        DurataProgramare: programare.DurataProgramare,
        ModelMasina: programare.Model,
        NrInmatriculare: programare.NrInmatriculare
    }));
}

export const validareProgramare = (body: any): { isValid: boolean, message?: string } => {
    const { Cod_Masina, DataProgramare, ModalitateContact, Actiune, IntervalOrar, DurataProgramare }: ProgramareRequestBody = body;

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
