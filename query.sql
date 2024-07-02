ALTER USER user_internship2024 WITH DEFAULT_SCHEMA = intern;

BEGIN TRY
	DROP TABLE IF EXISTS Telefon;
	DROP TABLE IF EXISTS IstoricService;
	DROP TABLE IF EXISTS Programari;
	DROP TABLE IF EXISTS Masini;
	DROP TABLE IF EXISTS Clienti;
	DROP TABLE IF EXISTS MarciAuto;
END TRY
BEGIN CATCH
	PRINT 'Eroare la stergerea tabelelor: ' + ERROR_MESSAGE();
END CATCH;


BEGIN TRY
CREATE TABLE Clienti (
Cod_Client INT PRIMARY KEY IDENTITY(1,1),
Nume VARCHAR(30) NOT NULL,
Prenume VARCHAR(30) NOT NULL,
Email VARCHAR(50),
Activ BIT NOT NULL DEFAULT 1,
CONSTRAINT CK_Email CHECK (Email LIKE '%_@__%.__%'));
END TRY
BEGIN CATCH
PRINT 'Eroare la crearea tabelului Clienti: ' + ERROR_MESSAGE();
END CATCH;

BEGIN TRY
CREATE TABLE Telefon(
Cod_Telefon INT PRIMARY KEY IDENTITY(1,1),
Cod_Client INT,
NrTel VARCHAR(10),
FOREIGN KEY (Cod_Client) REFERENCES Clienti(Cod_Client) ON DELETE CASCADE,
CONSTRAINT CK_Telefon CHECK (NrTel LIKE '09[0-9]{8}' AND LEN(NrTel) = 10));
END TRY
BEGIN CATCH
PRINT 'Eroare la crearea tabelului Telefon: ' + ERROR_MESSAGE();
END CATCH;

BEGIN TRY
CREATE TABLE MarciAuto(
Cod_Marca INT PRIMARY KEY IDENTITY(1,1),
Marca VARCHAR(50) NOT NULL);
END TRY
BEGIN CATCH; 
PRINT 'Eroare la crearea tabelului MarciAuto: ' + ERROR_MESSAGE();
END CATCH;

BEGIN TRY
INSERT INTO MarciAuto (Marca) VALUES
('Dacia'),
('Audi'),
('BMW'),
('Mercedes'),
('Volkswagen'),
('Toyota'),
('Ford');
END TRY
BEGIN CATCH 
PRINT 'Eroare la inserarea valorilor in tabelul MarciAuto' + ERROR_MESSAGE();
END CATCH;

BEGIN TRY
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
END TRY
BEGIN CATCH
PRINT 'Eroare la crearea tebelului Masini' + ERROR_MESSAGE();
END CATCH;


BEGIN TRY
CREATE TABLE Programari (
Cod_Programare INT PRIMARY KEY IDENTITY(1,1),
Cod_Client INT,
Cod_Masina INT,
DataProgramare DATETIME,
ModalitateContact VARCHAR(15),
Actiune VARCHAR(255),
IntervalOrar TIME,
DurataProgramare INT,
CONSTRAINT CK_MetodaContact CHECK (ModalitateContact IN ('telefon', 'email', 'fizic')),
CONSTRAINT CK_IntervalOrar CHECK ( DATEPART(HOUR, IntervalOrar) >= 8 AND DATEPART(HOUR, IntervalOrar) <= 17),
CONSTRAINT CK_DurataProgramare CHECK (DurataProgramare % 30 = 0 AND DurataProgramare > 0),
FOREIGN KEY (Cod_Client) REFERENCES Clienti(Cod_Client) ON DELETE CASCADE);
END TRY
BEGIN CATCH
PRINT 'Eroare la crearea tabelului Programari' + ERROR_MESSAGE();
END CATCH;

BEGIN TRY
CREATE TABLE IstoricService(
Cod_Istoric INT PRIMARY KEY IDENTITY(1,1),
Cod_Programare INT,
Cod_Masina INT,
DataPrimire DATETIME,
ProblemeDescoperite VARCHAR(499),
OperatiuniEfectuate VARCHAR(499),
PieseSchimbate VARCHAR(499),
AlteProblemeDescoperite VARCHAR(499),
ReparatiiEfectuate VARCHAR(499),
DurataReparatie INT,
CONSTRAINT CK_DurataReparatie CHECK (DurataReparatie % 10 = 0 AND DurataReparatie > 0),
FOREIGN KEY (Cod_Programare) REFERENCES Programari(Cod_Programare) ON DELETE CASCADE);
END TRY
BEGIN CATCH
PRINT 'Eroare la crearea tabelului IstoricService' + ERROR_MESSAGE();
END CATCH;
