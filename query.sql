ALTER USER user_internship2024 WITH DEFAULT_SCHEMA = intern;

DROP TABLE Telefon;
DROP TABLE Masini;
DROP TABLE Clienti;
DROP TABLE MarciAuto;





CREATE TABLE Clienti (
Cod_Client INT PRIMARY KEY IDENTITY(1,1),
Nume VARCHAR(30) NOT NULL,
Prenume VARCHAR(30) NOT NULL,
Email VARCHAR(50) NOT NULL,
Activ BIT NOT NULL DEFAULT 1,
CONSTRAINT CK_Email CHECK (Email LIKE '%_@__%.__%'));

CREATE TABLE Telefon(
Cod_Telefon INT PRIMARY KEY IDENTITY(1,1),
Cod_Client INT,
NrTel VARCHAR(10) NOT NULL,
FOREIGN KEY (Cod_Client) REFERENCES Clienti(Cod_Client) ON DELETE CASCADE,
CONSTRAINT CK_Telefon CHECK (NrTel LIKE '09[0-9]{8}' AND LEN(NrTel) = 10));

CREATE TABLE MarciAuto(
Cod_Marca INT PRIMARY KEY IDENTITY(1,1),
Marca VARCHAR(50) NOT NULL);

INSERT INTO MarciAuto (Marca) VALUES
('Dacia'),
('Audi'),
('BMW'),
('Mercedes'),
('Volkswagen'),
('Toyota'),
('Ford');

CREATE TABLE Masini(
Cod_Masina INT PRIMARY KEY IDENTITY(1,1),
Cod_Client INT,
Cod_Marca INT,
NrInmatriculare VARCHAR(15) NOT NULL,
VIN VARCHAR(17) NOT NULL,
Model VARCHAR(50),
AnFabr INT,
TipMotorizare VARCHAR(20),
CapacitateMotor DECIMAL(4,1),
CP INT,
KWP AS (CP * 0.745) PERSISTED,
KWh DECIMAL(5,2),
Activ BIT NOT NULL DEFAULT 1,
FOREIGN KEY (Cod_Client) REFERENCES Clienti(Cod_Client) ON DELETE CASCADE,
FOREIGN KEY (Cod_Marca) REFERENCES MarciAuto(Cod_Marca) ON DELETE CASCADE,
CONSTRAINT CK_NrInmatriculare CHECK (NrInmatriculare LIKE '[A-Z]{1,2}[0-9]{2,3}[A-Z]{3}'),
CONSTRAINT CK_VIN CHECK (VIN LIKE '[A-HJ-NPR-Z0-9]{17}'),
CONSTRAINT CK_TipMotorizare CHECK (TipMotorizare IN ('benzina', 'diesel', 'electric', 'hibrid')),
CONSTRAINT CK_KWh CHECK (
(TipMotorizare IN ('benzina', 'diesel') AND KWh IS NULL) OR
(TipMotorizare IN ('electric', 'hibrid') AND KWh IS NOT NULL)),
CONSTRAINT CK_CapacitateMotor CHECK (
(TipMotorizare = 'electric' AND CapacitateMotor IS NULL) OR
(TipMotorizare IN ('benzina', 'diesel', 'hibrid') AND CapacitateMotor IS NOT NULL))
);