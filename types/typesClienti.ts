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