ALTER USER user_internship2024 WITH DEFAULT_SCHEMA = intern;

BEGIN TRY
	DROP TABLE IF EXISTS Telefon;
	DROP TABLE IF EXISTS IstoricService;
	DROP TABLE IF EXISTS Programari;
	DROP TABLE IF EXISTS Masini;
	DROP TABLE IF EXISTS Clienti;
	DROP TABLE IF EXISTS MarciAuto;
	DROP VIEW IF EXISTS ClientContactInfo;
	DROP PROCEDURE IF EXISTS InsertClient;
	DROP PROCEDURE IF EXISTS InsertClient2;
	DROP PROCEDURE IF EXISTS UpdateClient;
	DROP PROCEDURE IF EXISTS getClienti;
	DROP PROCEDURE IF EXISTS dezactivareClient;
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
CONSTRAINT CK_Telefon CHECK (NrTel LIKE '07[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]' AND LEN(NrTel) = 10));
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
CONSTRAINT CK_NrInmatriculare CHECK (NrInmatriculare LIKE '[A-Z][A-Z][0-9][0-9][0-9][A-Z][A-Z][A-Z]'),
--CONSTRAINT CK_VIN CHECK (VIN LIKE '[A-HJ-NPR-Z0-9]{17}'),
--CONSTRAINT CK_VIN CHECK (VIN LIKE '[AZ0-9]' AND LEN(VIN) = 17),
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

/*INSERT INTO Clienti (Nume, Prenume, Email, Activ)
VALUES 
('Popescu', 'Ion', 'ion.popescu@example.com', 1),
('Ionescu', 'Maria', 'maria.ionescu@example.com', 1),
('Georgescu', 'Vasile', 'vasile.georgescu@example.com', 1),
('Dumitrescu', 'Elena', NULL, 1),
('Stan', 'Mihai', NULL, 1);
GO


INSERT INTO Telefon (Cod_Client, NrTel)
VALUES 
(1, '0712345678'), 
(1, '0723456789'), 
(3, '0734567890'), 
(4, '0745678901'), 
(5, '0756789012')  
GO
*/


GO
CREATE PROCEDURE InsertClient
@Nume VARCHAR(30),
@Prenume VARCHAR(30),
@Email VARCHAR(50) = NULL,
@NrTel VARCHAR(50) = NULL,
@Activ BIT = 1
AS
BEGIN
	BEGIN TRANSACTION;
	BEGIN TRY
		INSERT INTO Clienti (Nume, Prenume, Email, Activ) VALUES (@Nume, @Prenume, @Email, @Activ);
		DECLARE @Cod_Client INT;
		SET @Cod_Client = SCOPE_IDENTITY();

		IF @NrTel IS NOT NULL
		BEGIN
			INSERT INTO Telefon (Cod_Client, NrTel) VALUES (@Cod_Client, @NrTel);
		END
		IF (@Email IS NULL AND @NrTel IS NULL)
		BEGIN;
			THROW 50001, 'Trebuie furnizat cel putin un email sau un numar de telefon', 1;
		END
		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		PRINT 'Eroare la inserarea datelor: ' + ERROR_MESSAGE();
	END CATCH;
END
GO

CREATE PROCEDURE InsertClient2
@Nume VARCHAR(30),
@Prenume VARCHAR(30),
@Email VARCHAR(50) = NULL,
--@NrTel1 VARCHAR(10) = NULL,
--@NrTel2 VARCHAR(10) = NULL,
@NrTel VARCHAR(MAX) = NULL,
@Activ BIT = 1
AS
BEGIN
	BEGIN TRANSACTION;
	BEGIN TRY
		INSERT INTO Clienti (Nume, Prenume, Email, Activ)
		VALUES (@Nume, @Prenume, @Email, @Activ);
		DECLARE @Cod_Client INT;
		SET @Cod_Client = SCOPE_IDENTITY();

		--IF @NrTel IS NOT NULL
		--BEGIN;
		--	INSERT INTO Telefon (Cod_Client, NrTel)
		--	VALUES (@Cod_Client, @NrTel);
		--END

		IF (@Email IS NULL AND @NrTel IS NULL)
		BEGIN;
			THROW 50001, 'Trebuie sa fie furnizat cel putin un email sau un numar de telefon', 1;
		END
		IF @NrTel IS NOT NULL
		BEGIN;
			DECLARE @NrTele VARCHAR(10);
			DECLARE @Pos INT;
			SET @Pos = CHARINDEX(',', @NrTel);

			WHILE @Pos > 0 
			BEGIN
				SET @NrTele = LTRIM(RTRIM(LEFT(@NrTel, @Pos - 1)));
				INSERT INTO Telefon (Cod_Client, NrTel) VALUES(@Cod_Client, @NrTele);
				SET @NrTel = LTRIM(RTRIM(RIGHT(@NrTel, LEN(@NrTel) - @Pos)));
				SET @Pos = CHARINDEX(',', @NrTel);
			END
			INSERT INTO Telefon (Cod_Client, NrTel) VALUES (@Cod_Client, LTRIM(RTRIM(@NrTel)));
		END

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		PRINT 'Eroare la inserarea datelor: ' + ERROR_MESSAGE();
	END CATCH;
END
GO
	

--EXEC InsertClient @Nume = 'Popescu', @Prenume = 'Ion', @Email = 'ion.popescu@gmail.com', @NrTel = '0712345678';
--EXEC InsertClient @Nume = 'Georgescu', @Prenume = 'Vasile', @Email = 'vasile.georgescu@gmail.com';
--EXEC InsertClient @Nume = 'Stan', @Prenume = 'Mihai';
--SELECT * FROM ClientContactInfo;

--DROP TABLE Telefon;
--ALTER TABLE Clienti
--ADD NrTel1 VARCHAR(10), NrTel2 VARCHAR(10);

--ALTER TABLE Clienti
--ADD CONSTRAINT CK_Telefon UNIQUE (NrTel1, NrTel2);
--GO
--ALTER TABLE Clienti
--ADD CONSTRAINT CK_TelefonFormat CHECK (
--        (NrTel1 IS NULL OR (NrTel1 LIKE '07[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')) AND
--        (NrTel2 IS NULL OR (NrTel2 LIKE '07[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')));

--GO
--CREATE OR ALTER PROCEDURE InsertClient2
--@Nume VARCHAR(30),
--@Prenume VARCHAR(30),
--@Email VARCHAR(50) = NULL,
--@NrTel1 VARCHAR(10) = NULL,
--@NrTel2 VARCHAR(10) = NULL,
--@Activ BIT = 1
--AS
--BEGIN
--	SET NOCOUNT ON;
--	BEGIN TRANSACTION;
--	BEGIN TRY
--		IF (@Email IS NULL AND @NrTel1 IS NULL AND @NrTel2 IS NULL)
--		BEGIN;
--			THROW 50001, 'Este nevoie de cel putin un email sau un numar de telefon: ', 1;
--		END

--		INSERT INTO Clienti (Nume, Prenume, Email, NrTel1, NrTel2, Activ)
--		VALUES (@Nume, @Prenume, @Email, @NrTel1, @NrTel2, @Activ);

--		COMMIT TRANSACTION;
--	END TRY
--	BEGIN CATCH
--		ROLLBACK TRANSACTION;
--		PRINT 'Eroare la inserarea datelor: ' + ERROR_MESSAGE();
--	END CATCH;
--END
--GO

GO
CREATE VIEW ClientContactInfo AS SELECT c.Nume, c.Prenume, c.Email, STRING_AGG(t.NrTel, ', ') AS NrTelefon, c.Activ FROM Clienti c
LEFT JOIN Telefon t ON c.Cod_Client = t.Cod_Client
GROUP BY Nume, Prenume, Email, Activ;
GO


EXEC InsertClient2 @Nume = 'Stan', @Prenume = 'Mihai', @Email = 'stan.mihai@gmail.com', @NrTel = '0712345688,0711147678';
EXEC InsertClient2 @Nume = 'Stan', @Prenume = 'Gigel', @Email = 'stan.mihaifftyg@gmail.com', @NrTel = '0712345578';
EXEC InsertClient2 @Nume = 'Stan', @Prenume = 'Mihaiii', @Email = 'stan.mihaifhgf@gmail.com';
EXEC InsertClient2 @Nume = 'Popescu', @Prenume = 'Ion', @NrTel = '0712345678';
EXEC InsertClient2 @Nume = 'Poghfggpescu', @Prenume = 'Iojhgjhgjhgn';
EXEC InsertClient2 @Nume = 'Popescghfgfho', @Prenume = 'Cristi', @NrTel = '0712345678,       0712345678';
SELECT * FROM Clienti;
SELECT * FROM ClientContactInfo;
SELECT * FROM Telefon;

SELECT c.Cod_Client,c.Nume, c.Prenume, c.Email, STRING_AGG(t.NrTel, ', ') AS NrTelefon
FROM Clienti c
JOIN Telefon t ON c.Cod_Client = t.Cod_Client
GROUP BY c.Cod_Client, Nume, Prenume, Email;

GO
CREATE PROCEDURE getClienti
AS
BEGIN
    SELECT c.Cod_Client,
           c.Nume,
           c.Prenume,
           c.Email,
           STRING_AGG(t.NrTel, ', ') AS NrTelefon
    FROM Clienti c
    JOIN Telefon t ON c.Cod_Client = t.Cod_Client
    WHERE c.Activ = 1
    GROUP BY c.Cod_Client, c.Nume, c.Prenume, c.Email;
END
GO

INSERT INTO Masini (Cod_Client, Cod_Marca, NrInmatriculare, VIN, Model, AnFabr, TipMotorizare, CapacitateMotor, CP, KWh)
VALUES
  (1, 1, 'BU123ABC', '1HD1FAL11NY500561', 'Dacia Logan', 2020, 'benzina', 1.6, 100, NULL),
  (2, 3, 'AB123ECD', '1YVHP84DX55N13025', 'BMW X5', 2022, 'diesel', 3.0, 300, NULL),
  (3, 2, 'TM345JEF', '3D73Y3CL6BG585460', 'Tesla Model 3', 2023, 'electric', NULL, 350, 100.00);

SELECT * FROM Masini;


DROP PROCEDURE IF EXISTS UpdateClient;
GO
CREATE PROCEDURE UpdateClient
@Cod_Client INT,
@Nume VARCHAR(30) = NULL,
@Prenume VARCHAR(30) = NULL,
@Email VARCHAR(50) = NULL,
@NrTel VARCHAR(MAX) = NULL,
@Activ BIT = 1
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        IF (@Email IS NULL AND @NrTel IS NULL)
        BEGIN;
			DECLARE @CurrentEmail VARCHAR(50);
			DECLARE @CurrentNrTel VARCHAR(10);
			SELECT @CurrentEmail = Email FROM Clienti WHERE Cod_Client = @Cod_Client;
			SELECT TOP 1 @CurrentNrTel = NrTel FROM Telefon WHERE Cod_Client = @Cod_Client;
			IF(@CurrentEmail IS NULL AND @CurrentNrTel IS NULL)
			BEGIN;
            THROW 50001, 'Trebuie sa fie furnizat cel putin un email sau un numar de telefon', 1;
			END
        END

        UPDATE Clienti
        SET Nume = COALESCE(@Nume, Nume),
            Prenume = COALESCE(@Prenume, Prenume),
            Email = COALESCE(@Email, Email),
            Activ = COALESCE(@Activ, Activ)
        WHERE Cod_Client = @Cod_Client;


        IF @NrTel IS NOT NULL
        BEGIN
			DELETE FROM Telefon WHERE Cod_Client = @Cod_Client;

            DECLARE @NrTele VARCHAR(10);
            DECLARE @Pos INT;
            SET @Pos = CHARINDEX(',', @NrTel);

            WHILE @Pos > 0 
            BEGIN
                SET @NrTele = LTRIM(RTRIM(LEFT(@NrTel, @Pos - 1)));
                INSERT INTO Telefon (Cod_Client, NrTel) VALUES (@Cod_Client, @NrTele);
                SET @NrTel = LTRIM(RTRIM(RIGHT(@NrTel, LEN(@NrTel) - @Pos)));
                SET @Pos = CHARINDEX(',', @NrTel);
            END
            INSERT INTO Telefon (Cod_Client, NrTel) VALUES (@Cod_Client, LTRIM(RTRIM(@NrTel)));
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END
GO

GO
CREATE PROCEDURE dezactivareClient
	@Cod_Client INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        UPDATE Clienti
        SET Activ = 0
        WHERE Cod_Client = @Cod_Client;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END
GO
SELECT Cod_Client, Nume, Prenume FROM Clienti;
SELECT * FROM ClientContactInfo;

UPDATE Telefon
SET NrTel = '0728973720'
WHERE Cod_Client = 1;



EXEC UpdateClient @Cod_Client = 1, @NrTel = '0771456266,0712345688,0711147678';

GO
CREATE PROCEDURE adaugareMasina
@Cod_Client INT,
@Cod_Marca VARCHAR(30),
@NrInmatriculare VARCHAR(10),
@VIN VARCHAR(17),
@Model VARCHAR(30),
@AnFabr INT,
@TipMotorizare VARCHAR(10),
@CapacitateMotor DECIMAL(4,1) = NULL,
@CP INT,
@KWh DECIMAL(5,2) = NULL,
@Activ BIT = 1
AS
BEGIN;
    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO Masini (
            Cod_Client, Cod_Marca, NrInmatriculare, VIN, Model, AnFabr, 
            TipMotorizare, CapacitateMotor, CP, KWh, Activ
        )
        VALUES (
            @Cod_Client, @Cod_Marca, @NrInmatriculare, @VIN, @Model, @AnFabr, 
            @TipMotorizare, @CapacitateMotor, @CP, @KWh, @Activ
        );

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END
GO