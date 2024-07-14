export type MasiniRequestBody = {
    Cod_Client: number;
    NrInmatriculare: string;
    VIN: string;
    Model: string;
    AnFabr: number;
    TipMotorizare: string;
    CapacitateMotor: number;
    CP: number;
    KWh: number;
    Activ: boolean;
};

export const validareMasina = (body: any, isUpdate = false): { isValid: boolean, message?: string } => {
  const { Cod_Client, NrInmatriculare, VIN, Model, AnFabr, TipMotorizare, CapacitateMotor, CP, KWh, Activ }: MasiniRequestBody = body;

  if (!isUpdate || (Cod_Client !== undefined)) {
    if (typeof Cod_Client !== 'number') {
      return { isValid: false, message: 'Cod_Client trebuie sa fie un numar si este obligatoriu' };
    }
  }
  if (!isUpdate || (NrInmatriculare !== undefined)) {
    if (typeof NrInmatriculare !== 'string') {
      return { isValid: false, message: 'Nr de inmatriculare este obligatoriu si trebuie sa respecte formatul legal' };
    }
  }
  if (!isUpdate || (VIN !== undefined)) {
    if (typeof VIN !== 'string' || VIN.length !== 17) {
      return { isValid: false, message: 'VIN este obligatoriu si trebuie sa fie un string de 17 caractere' };
    }
  }
  if (!isUpdate || (Model !== undefined)) {
    if (typeof Model !== 'string') {
      return { isValid: false, message: 'Modelul este obligatoriu si trebuie sa fie un string' };
    }
  }
  if (!isUpdate || (AnFabr !== undefined)) {
    if (typeof AnFabr !== 'number') {
      return { isValid: false, message: 'Anul de fabricatie este obligatoriu si trebuie sa fie un numar' };
    }
  }
  if (!isUpdate || (TipMotorizare !== undefined)) {
    if (typeof TipMotorizare !== 'string') {
      return { isValid: false, message: 'Tipul de motorizare este obligatoriu si trebuie sa fie un string' };
    }
  }
  if (!isUpdate || (CapacitateMotor !== undefined)) {
    if ((TipMotorizare === 'benzina' || TipMotorizare === 'diesel' || TipMotorizare === 'hibrid') && typeof CapacitateMotor !== 'number') {
      return { isValid: false, message: 'Capacitatea motorului este obligatorie si trebuie sa fie un numar' };
    }
  }
  if (!isUpdate || (CP !== undefined)) {
    if (typeof CP !== 'number') {
      return { isValid: false, message: 'CP este obligatoriu si trebuie sa fie un numar' };
    }
  }
  if ((TipMotorizare === 'hibrid' || TipMotorizare === 'electric') && KWh === null) {
    return { isValid: false, message: 'KWh este obligatoriu pentru motorizarile hibride și electrice' };
  }
  if (!isUpdate || (Activ !== undefined)) {
    if (typeof Activ !== 'boolean' && Activ !== 1 && Activ !== 0) {
      return { isValid: false, message: 'Activ trebuie sa aiba valoarea \'0\' sau \'1\'' };
    }
  }

  return { isValid: true };
};