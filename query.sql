USE [internship2024]

ALTER USER user_internship2024 WITH DEFAULT_SCHEMA = intern;
DBCC USEROPTIONS;
SET DATEFORMAT dmy;
--SET IMPLICIT_TRANSACTIONS OFF;
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
	DROP PROCEDURE IF EXISTS adaugareMasina;
	DROP PROCEDURE IF EXISTS actualizareMasina;
	DROP PROCEDURE IF EXISTS dezactivareMasina;
	DROP PROCEDURE IF EXISTS adaugaProgramare;
	DROP PROCEDURE IF EXISTS updateIstoricServiceStatus;
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
Activ BIT NOT NULL);
END TRY
BEGIN CATCH
PRINT 'Eroare la crearea tabelului Clienti: ' + ERROR_MESSAGE();
END CATCH;

DROP FUNCTION IF EXISTS validareClient;
GO
CREATE FUNCTION validareClient(@Nume VARCHAR(MAX), @Prenume VARCHAR(MAX), @Email VARCHAR(MAX), @Activ BIT, @NrTel VARCHAR(MAX))
RETURNS VARCHAR(MAX)
AS
BEGIN
	DECLARE @User VARCHAR(50)
	DECLARE @MailServer VARCHAR(50)
	DECLARE @Domeniu VARCHAR(50)
	DECLARE @Error VARCHAR(MAX) = 'valid';
	
	IF @Nume LIKE '%[^a-zA-Z%]'
	BEGIN
		SET @Error = 'Numele poate fi alcatuit numai din litere'
		RETURN @Error;
	END



	IF @Activ NOT IN (0, 1) OR @Activ IS NULL
	BEGIN;
		SET @Error = 'Trebuie specificat daca clientul este Activ(1) sau Inactiv(0)';
		RETURN @Error
	END

	IF (@Email IS NULL AND @NrTel IS NULL)
		BEGIN;
		SET @Error = 'Trebuie sa fie furnizat cel putin un email sau un numar de telefon'
		RETURN @Error;
		END

	--IF (@NrTel NOT LIKE '0[237][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]' AND LEN(@NrTel) = 10)
	--	BEGIN;
	--	SET @Error = 'Numarul de telefon fgkjhgfkjhgf'
	--	RETURN @Error;
	--	END


	IF @Email IS NOT NULL
	BEGIN;
			IF CHARINDEX('@', @Email) > 0 AND CHARINDEX('.', @Email, CHARINDEX('@', @Email)) > CHARINDEX('@', @Email)
			BEGIN
				SET @User = LEFT(@Email, CHARINDEX('@', @Email) - 1)
				SET @MailServer = SUBSTRING(@Email, CHARINDEX('@', @Email) + 1, CHARINDEX('.', @Email, CHARINDEX('@', @Email)) - CHARINDEX('@', @Email) - 1)
				SET @Domeniu = RIGHT(@Email, LEN(@Email) - CHARINDEX('.', @Email, CHARINDEX('@', @Email)))

			IF LEN(@User) < 3 
			BEGIN;
				SET @Error = 'Numele de utilizator al emailului trebuie sa aiba cel putin 3 caractere.'
				RETURN @Error;

			END

			ELSE IF LEN(@User) > 32 
			BEGIN;
				SET @Error = 'Numele de utilizator al emailului trebuie sa aiba maxim 32 de caractere.'
				RETURN @Error;
			END

			ELSE IF LEFT(@User, 1) = '.'
			BEGIN;
				SET @Error = 'Numele de utilizator din email nu poate incepe cu ''.'''
				RETURN @Error;
			END

			ELSE IF RIGHT(@User, 1) = '.'
			BEGIN
				SET @Error = 'Numele de utilizator din email nu se poate incheia cu ''.'''
				RETURN @Error;
			END

			ELSE IF @User LIKE '%[^a-zA-Z0-9!#$%&''*+/=?^_`{|}~.-]%'
			BEGIN;
				SET @Error = 'Numele de utilizator din emailcontine caractere invalide. Sunt permise urmatoarele simboluri: ! # $ % & '' , * + / = ? ^ _ ` { | } ~ -'
				RETURN @Error;
			END
			ELSE IF @User LIKE '%..%'
			BEGIN;
				SET @Error = 'Numele de utilizator din email nu poate contine puncte consecutive.'
				RETURN @Error;
			END
    
			--server mail
			ELSE IF LEN(@MailServer) < 3
			BEGIN;
				SET @Error = 'Serverul emailului trebuie sa aiba cel putin 3 caractere.'
				RETURN @Error;
			END

			ELSE IF LEN(@MailServer) > 24
			BEGIN;
				SET @Error = 'Serverul emailului trebuie sa aiba maxim 24 de caractere.'
				RETURN @Error;

			END

			ELSE IF @MailServer LIKE '%[^a-zA-Z0-9-]%'
			BEGIN;
				SET @Error = 'Serverul emailului poate conține doar litere, cifre si liniute.'
				RETURN @Error;
			END

			ELSE IF LEFT(@MailServer, 1) = '-' OR RIGHT(@MailServer, 1) = '-'
			BEGIN;
				SET @Error = 'Serverul emailului nu poate incepe sau termina cu o liniuta.'
				RETURN @Error;
			END
    
			-- domeniu
			ELSE IF LEN(@Domeniu) < 2
			BEGIN;
				SET @Error = 'Domeniul emailului trebuie sa contina cel putin 2 caractere.'
				RETURN @Error;

			END
			ELSE IF @Domeniu LIKE '%[^a-zA-Z]%'
			BEGIN;
				SET @Error = 'Domeniul emailului trebuie sa contina doar litere.'
			END
	
			ELSE IF LEN(@Domeniu) > 5 
			BEGIN;
				SET @Error = 'Numele de utilizator al emailului trebuie sa aiba maxim 32 de caractere.'
			END
		END
    ELSE
    BEGIN;
        SET @Error = 'Formatul emailului este incorect.'
    END
	END
	---- TELEFOOON
	    IF @NrTel IS NOT NULL
    BEGIN
        DECLARE @NrTelArray VARCHAR(MAX) = @NrTel;
        DECLARE @SingleNrTel VARCHAR(MAX);
        DECLARE @Pos INT;

        SET @Pos = CHARINDEX(',', @NrTelArray);
        WHILE @Pos > 0 
        BEGIN
            SET @SingleNrTel = LTRIM(RTRIM(LEFT(@NrTelArray, @Pos - 1)));
            IF @SingleNrTel LIKE '%[^0-9]%' OR LEN(@SingleNrTel) != 10
            BEGIN
                SET @Error = 'Numarul de telefon trebuie sa contina 10 cifresse';
                --RETURN @Error;
            END
			ELSE IF @SingleNrTel LIKE '%^0[^237][^0-9][^0-9][^0-9][^0-9][^0-9][^0-9][^0-9][^0-9]%'
			BEGIN
				SET @Error = 'Numarul de telefon trebuie sa aiba prefix romanesc'
			END
            SET @NrTelArray = LTRIM(RTRIM(RIGHT(@NrTelArray, LEN(@NrTelArray) - @Pos)));
            SET @Pos = CHARINDEX(',', @NrTelArray);
        END


        IF LEN(@NrTelArray) != 10
        BEGIN
            SET @Error = 'Numarul de telefon trebuie sa contina 10 cifreeeej';
            --RETURN @Error;
        END
		ELSE IF @SingleNrTel LIKE '%^0[^237][^0-9][^0-9][^0-9][^0-9][^0-9][^0-9][^0-9][^0-9]%'
			BEGIN
				SET @Error = 'Numarul de telefon trebuie sa aiba prefix RO'
			END
    END


	RETURN @Error;

END
GO

BEGIN TRY
CREATE TABLE Telefon(
Cod_Telefon INT PRIMARY KEY IDENTITY(1,1),
Cod_Client INT,
NrTel VARCHAR(10),
FOREIGN KEY (Cod_Client) REFERENCES Clienti(Cod_Client) ON DELETE CASCADE,
CONSTRAINT CK_Telefon CHECK (NrTel LIKE '0[237][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]' AND LEN(NrTel) = 10));
END TRY
BEGIN CATCH
PRINT 'Eroare la crearea tabelului Telefon: ' + ERROR_MESSAGE();
END CATCH;

BEGIN TRY
CREATE TABLE Masini(
Cod_Masina INT PRIMARY KEY IDENTITY(1,1),
Cod_Client INT,
--Cod_Marca INT,
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
--FOREIGN KEY (Cod_Marca) REFERENCES MarciAuto(Cod_Marca) ON DELETE CASCADE,
CONSTRAINT CK_NrInmatriculare CHECK (NrInmatriculare LIKE '[A-Z][A-Z][0-9][0-9][0-9][A-Z][A-Z][A-Z]'
OR NrInmatriculare LIKE '[A-Z][A-Z][0-9][0-9][A-Z][A-Z][A-Z]'),
--CONSTRAINT CK_VIN CHECK (VIN NOT LIKE '%[^a-zA-Z0-9%]' AND LEN(VIN) = 17),
--CONSTRAINT CK_VIN CHECK (intern.validareVIN(VIN) = 1),
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

GO
CREATE OR ALTER FUNCTION validareVIN(@VIN VARCHAR(17))
RETURNS BIT
AS
BEGIN
	DECLARE @valid BIT = 0;
	IF LEN(@VIN) = 17 AND @VIN NOT LIKE '%[^a-zA-Z0-9]%'
	BEGIN
		SET @valid = 1;
	END
	RETURN @valid;
END
GO

ALTER TABLE Masini
ADD CONSTRAINT CK_VIN CHECK (intern.validareVIN(VIN) = 1);

BEGIN TRY
CREATE TABLE Programari (
Cod_Programare INT PRIMARY KEY IDENTITY(1,1),
Cod_Masina INT NOT NULL,
DataProgramare DATE NOT NULL,
ModalitateContact VARCHAR(15) NOT NULL,
Actiune VARCHAR(255) NOT NULL,
IntervalOrar TIME NOT NULL,
DurataProgramare INT NOT NULL,
CONSTRAINT CK_MetodaContact CHECK (ModalitateContact IN ('telefon', 'email', 'fizic')),
CONSTRAINT CK_IntervalOrar CHECK (DATEPART(HOUR, IntervalOrar) >= 8 AND DATEPART(HOUR, IntervalOrar) <= 17),
CONSTRAINT CK_IntervalOrar2 CHECK (DATEPART(MINUTE, IntervalOrar) = 30 OR DATEPART(MINUTE, IntervalOrar) = 00),
CONSTRAINT CK_DurataProgramare CHECK (DurataProgramare % 30 = 0 AND DurataProgramare >= 30),
CONSTRAINT CK_Actiune CHECK (Actiune IN ('revizie', 'reparatie')),
FOREIGN KEY (Cod_Masina) REFERENCES Masini(Cod_masina) ON DELETE CASCADE);
END TRY
BEGIN CATCH
PRINT 'Eroare la crearea tabelului Programari' + ERROR_MESSAGE();
END CATCH;


BEGIN TRY
CREATE TABLE IstoricService(
Cod_Istoric INT PRIMARY KEY IDENTITY(1,1),
Cod_Programare INT,
Cod_Masina INT,
Status TINYINT NOT NULL DEFAULT 0,
StatusText AS (
CASE 
    WHEN Status = 1 THEN 'Programat'
    WHEN Status = 2 THEN 'Masina Preluata'
    WHEN Status = 3 THEN 'Masina externata'
    ELSE 'Necunoscut'
END),
DataPrimire DATE,
ProblemeMentionate VARCHAR(499),
ProblemeVizualeConstatate VARCHAR(499),
OperatiuniEfectuate VARCHAR(499),
PieseSchimbate VARCHAR(499),
PieseReparate VARCHAR(499),
AlteProblemeDescoperite VARCHAR(499),
AlteReparatii VARCHAR(499),
DurataReparatie INT,
CONSTRAINT CK_DurataReparatie CHECK (DurataReparatie % 10 = 0 AND DurataReparatie > 0),
CONSTRAINT CK_Status CHECK (Status IN (0, 1, 2, 3)),
FOREIGN KEY (Cod_Programare) REFERENCES Programari(Cod_Programare) ON DELETE CASCADE);
END TRY
BEGIN CATCH
PRINT 'Eroare la crearea tabelului ''IstoricService''' + ERROR_MESSAGE();
END CATCH;

GO
CREATE OR ALTER PROCEDURE InsertClient2
@Nume VARCHAR(30),
@Prenume VARCHAR(30),
@Email VARCHAR(50) = NULL,
@NrTel VARCHAR(MAX) = NULL,
@Activ BIT
AS
BEGIN
	BEGIN TRANSACTION;
	BEGIN TRY
	DECLARE @Message VARCHAR(MAX)
	SET @Message = intern.validareClient(@Nume, @Prenume, @Email, @Activ, @NrTel)
	IF @Message != 'valid'
	BEGIN;
	THROW 50001, @Message, 1;
	PRINT @Message
	END
	IF (@Email IS NULL AND @NrTel IS NULL)
		BEGIN;
			SET @Message = 'Trebuie sa fie furnizat cel putin un email su un numar de telefon';
			THROW 50007, @Message, 1;
			--RETURN @Message;
		END


		--IF @Email IS NOT NULL
		--BEGIN
		---DECLARE @Message VARCHAR(MAX)
		--SET @Message = intern.validareClient(@Nume, @Prenume, @Email, @Activ, @NrTel)

		--IF @Message != 'valid'
		--BEGIN;
		--	--THROW 50001, @Message, 1;
		--	PRINT @Message;
		--END
	--END


		INSERT INTO Clienti (Nume, Prenume, Email, Activ)
		VALUES (@Nume, @Prenume, @Email, @Activ);
		DECLARE @Cod_Client INT;
		SET @Cod_Client = SCOPE_IDENTITY();


		--IF @NrTel IS NOT NULL
		--BEGIN;
		--	DECLARE @NrTele VARCHAR(10);
		--	DECLARE @Pos INT;
		--	SET @Pos = CHARINDEX(',', @NrTel);

		--	WHILE @Pos > 0 
		--	BEGIN
		--		SET @NrTele = LTRIM(RTRIM(LEFT(@NrTel, @Pos - 1)));
		--		IF LEN(@NrTele) != 10  /*OR @NrTele LIKE '%[^0-9]%'*/
		--		BEGIN
		--			SET @Message = 'prea lung/scurt'
		--			RETURN @Message
		--			END
		--		IF @NrTele NOT LIKE '0[237][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'
		--		BEGIN;
		--		SET @Message = 'prefixul nu este romanesc'
					
		--		RETURN @Message
		--		END

		--		INSERT INTO Telefon (Cod_Client, NrTel) VALUES(@Cod_Client, @NrTele);
		--		SET @NrTel = LTRIM(RTRIM(RIGHT(@NrTel, LEN(@NrTel) - @Pos)));
		--		SET @Pos = CHARINDEX(',', @NrTel);
		--	END
		--	INSERT INTO Telefon (Cod_Client, NrTel) VALUES (@Cod_Client, LTRIM(RTRIM(@NrTel)));
		--END

		        IF @NrTel IS NOT NULL
        BEGIN;
            DECLARE @NrTele VARCHAR(10);
            DECLARE @Pos INT;
            
            WHILE LEN(@NrTel) > 0
            BEGIN
                SET @Pos = CHARINDEX(',', @NrTel);
                
                IF @Pos = 0
                    SET @NrTele = @NrTel
                ELSE
                    SET @NrTele = LEFT(@NrTel, @Pos - 1);
                
                SET @NrTele = LTRIM(RTRIM(@NrTele));
                
                IF LEN(@NrTele) != 10
                BEGIN
                    SET @Message = 'Număr de telefon prea lung/scurt: ' + @NrTele;
                    THROW 50002, @Message, 1;
                END
                
                IF @NrTele NOT LIKE '0[237][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'
                BEGIN
                    SET @Message = 'Prefixul nu este românesc: ' + @NrTele;
                    THROW 50003, @Message, 1;
                END
                
                INSERT INTO Telefon (Cod_Client, NrTel) VALUES(@Cod_Client, @NrTele);
                
                IF @Pos = 0 
                    SET @NrTel = ''
                ELSE
                    SET @NrTel = SUBSTRING(@NrTel, @Pos + 1, LEN(@NrTel));
            END
        END

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION;
		--THROW 50001, @Message, 1;
		--PRINT @Message;
		THROW;
	END CATCH;
END
GO

GO
CREATE VIEW ClientContactInfo AS SELECT c.Cod_Client, c.Nume, c.Prenume, c.Email, STRING_AGG(t.NrTel, ', ') AS NrTelefon, c.Activ FROM Clienti c
LEFT JOIN Telefon t ON c.Cod_Client = t.Cod_Client
GROUP BY c.Cod_Client, Nume, Prenume, Email, Activ;
GO

EXEC InsertClient2 @Nume = 'Stan', @Prenume = 'Mihai', @Email = 's.tan.mihai@gmail.com', @NrTel = '0712345688,0711147678', @Activ= 1;
EXEC InsertClient2 @Nume = 'Stan', @Prenume = 'Gigel', @Email = 'stan.mihaifftyg@gmail.com', @NrTel = '0712345578', @Activ= 1;
EXEC InsertClient2 @Nume = 'Stan', @Prenume = 'Mihaiii', @Email = 'stan.mihaifhgf@gmail.com', @Activ= 1;
EXEC InsertClient2 @Nume = 'Popescu', @Prenume = 'Ion', @NrTel = '0712345678', @Activ= 1;
EXEC InsertClient2 @Nume = 'Poghfggpescu', @Prenume = 'Iojhgjhgjhgn', @NrTel= '0345687859', @Activ= 1;
EXEC InsertClient2 @Nume = 'Popescghfgfho', @Prenume = 'Cristi', @NrTel = '0712345678,0712345678', @Activ= 1;

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
    --WHERE c.Activ = 1
    GROUP BY c.Cod_Client, c.Nume, c.Prenume, c.Email;
END
GO

GO
CREATE OR ALTER PROCEDURE getClientiInternal
    @Activ BIT = NULL
AS
BEGIN
    SELECT c.Cod_Client,
           c.Nume,
           c.Prenume,
           c.Email,
           STRING_AGG(t.NrTel, ', ') AS NrTelefon
    FROM Clienti c
    JOIN Telefon t ON c.Cod_Client = t.Cod_Client
    WHERE (@Activ IS NULL OR c.Activ = @Activ)
    GROUP BY c.Cod_Client, c.Nume, c.Prenume, c.Email;
END
GO
SELECT * FROM Clienti;
SELECT * FROM ClientContactInfo;
GO
CREATE OR ALTER PROCEDURE getClientiActivi
AS
BEGIN
    EXEC getClientiInternal @Activ = 1;
END
GO
EXEC getClientiActivi;

GO
CREATE OR ALTER PROCEDURE getClientiInactivi
AS
BEGIN 
	EXEC getClientiInternal @Activ = 0;
	END
GO


GO
CREATE OR ALTER PROCEDURE getMasini
AS
BEGIN
	SELECT m.Cod_Masina, m.Cod_Client, m.NrInmatriculare, m.VIN, m.Model, m.AnFabr, m.TipMotorizare, m.CapacitateMotor, m.CP, m.KWh
	FROM Masini m
	GROUP BY Cod_Masina, Cod_Client, NrInmatriculare, VIN, Model, AnFabr, TipMotorizare, CapacitateMotor, CP, KWh
END
GO

INSERT INTO Masini (Cod_Client, NrInmatriculare, VIN, Model, AnFabr, TipMotorizare, CapacitateMotor, CP, KWh)
VALUES
  (1, 'BU123ABC', '1HD1FAL11NY500561', 'Dacia Logan', 2020, 'benzina', 1.6, 100, NULL),
  (2, 'AB123ECD', '1YVHP84DX55N13025', 'BMW X5', 2022, 'diesel', 3.0, 300, NULL),
  (3, 'TM345JEF', '3D73Y3CL6BG585460', 'Tesla Model 3', 2023, 'electric', NULL, 350, 100.00);

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



DROP FUNCTION IF EXISTS validareMasina
GO
CREATE FUNCTION validareMasina( @Cod_Client VARCHAR(MAX),
    @NrInmatriculare VARCHAR(MAX),
    @VIN VARCHAR(MAX),
    @Model VARCHAR(30),
    @AnFabr INT,
    @TipMotorizare VARCHAR(10),
    @CapacitateMotor DECIMAL(4,1),
    @CP INT,
    @KWh DECIMAL(5,2))
RETURNS VARCHAR(MAX)
AS
BEGIN
	DECLARE @Message VARCHAR(MAX) = 'valid';
    
	------ CLIENT-----
	IF NOT EXISTS (SELECT 1 FROM Clienti WHERE Cod_Client = @Cod_Client)
	BEGIN
		SET @Message = 'Proprietarul masinii nu se regaseste in baza de date.';
		--RETURN @Message;
	END

    ELSE IF TRY_CONVERT(INT, @Cod_Client) IS NULL
    BEGIN
        SET @Message = 'Cod_Client trebuie sa fie de tip INT';
        --RETURN @Message;
    END
	--AN FABR-----
    IF @AnFabr IS NULL
    BEGIN
        SET @Message = 'Anul de fabricatie nu poate fi null';
		--RETURN @Message;
    END

    ELSE IF @AnFabr < 1900
    BEGIN
        SET @Message = 'Anul de fabricatie nu poate fi mai mic de 1900';
		--RETURN @Message;
    END

    ELSE IF @AnFabr >= YEAR(GETDATE()) + 1
    BEGIN
        SET @Message = 'Anul de fabricatie nu poate fi din viitor';
		--RETURN @Message;
		END

	---VIN CHECK
    ELSE IF LEN(@VIN) != 17
	BEGIN
		SET @Message = 'Seria sasiului e invalida';
		--RETURN @Message;
	END

	ELSE IF ISNUMERIC(@VIN) = 1
	BEGIN
		SET @Message = 'Seria sasiului nu poate sa fie alcatuita numai din cifre';
		--RETURN @Message;
	END
	ELSE IF @VIN LIKE '%[^a-zA-Z0-9]%'
	BEGIN
		SET @Message = 'Seria sasiului este compusa numai din litere si cifre'
		--RETURN @Message;
		END

	ELSE IF TRY_CAST(@VIN AS FLOAT) IS NOT NULL
    BEGIN
        SET @Message = 'VIN-ul trebuie sa fie un sir de caractere';
        --RETURN @Message;
    END

	---TIP MOTORIZARE
	ELSE IF @TipMotorizare NOT IN ('Benzina', 'Diesel', 'Electric', 'Hibrid')
    BEGIN
        SET @Message = 'Tipul de motorizare trebuie sa fie unul dintre: Benzina, Diesel, Electric, Hibrid';
        --RETURN @Message;
    END

	-- CAPACITATE MOTOR
	ELSE IF @CapacitateMotor IS NOT NULL AND (@CapacitateMotor < 0.8 OR @CapacitateMotor > 8.0)
    BEGIN
        SET @Message = 'Capacitatea motorului trebuie sa fie intre 0.8 si 8.0 litri';
        --RETURN @Message;
    END

	-- CAI PUTERE
	IF @CP < 0 OR @CP > 2000
    BEGIN
        SET @Message = 'Puterea motorului trebuie sa fie intre 0 si 2000 CP';
       -- RETURN @Message;
	END

	-- BATERIE MASINI ELECTRICE/HIBRIDE
    ELSE IF (@TipMotorizare = 'Electric' OR @TipMotorizare = 'Hibrid') AND (@KWh IS NULL OR @KWh <= 0)
    BEGIN
        SET @Message = 'Capacitatea bateriei trebuie sa fie mai mare de 0';
        --RETURN @Message;
    END

    RETURN @Message;
END
GO

GO
CREATE OR ALTER PROCEDURE adaugareMasina
@Cod_Client INT,
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
		DECLARE @Message VARCHAR(MAX);
		SET @Message = intern.validareMasina(@Cod_Client,
    @NrInmatriculare,
    @VIN,
    @Model,
    @AnFabr,
    @TipMotorizare ,
    @CapacitateMotor ,
    @CP,
    @KWh)

		IF @Message != 'valid'
		BEGIN;
			THROW 50001, @Message, 1;
			PRINT @Message
		END
        INSERT INTO Masini (
            Cod_Client, NrInmatriculare, VIN, Model, AnFabr, 
            TipMotorizare, CapacitateMotor, CP, KWh, Activ
        )
        VALUES (
            @Cod_Client, @NrInmatriculare, @VIN, @Model, @AnFabr, 
            @TipMotorizare, @CapacitateMotor, @CP, @KWh, @Activ
        );
		
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
		--PRINT 'Eroare la introducerea masinii: ' + @Message;
		THROW 50001, @Message, 1;
    END CATCH;
END
GO

GO
CREATE PROCEDURE actualizareMasina
@Cod_Masina INT,
@Cod_Client INT = NULL,
@NrInmatriculare VARCHAR(15) = NULL,
@VIN VARCHAR(17) = NULL,
@Model VARCHAR(50) = NULL,
@AnFabr INT = NULL,
@TipMotorizare VARCHAR(20) = NULL,
@CapacitateMotor DECIMAL(4,1) = NULL,
@CP INT = NULL,
@KWh DECIMAL(5,2) = NULL,
@Activ BIT = NULL
AS
BEGIN
	BEGIN TRANSACTION;
	BEGIN TRY		DECLARE @Message VARCHAR(MAX);
		SET @Message = intern.validareMasina(@Cod_Client,
    @NrInmatriculare,
    @VIN,
    @Model,
    @AnFabr,
    @TipMotorizare ,
    @CapacitateMotor ,
    @CP,
    @KWh)

	IF @Message != 'valid'
	BEGIN;
		PRINT @Message
	END
	IF NOT EXISTS (SELECT 1 FROM Masini WHERE Cod_Masina = @Cod_Masina)
	BEGIN;
		SET @Message = 'Masina nu exista';
		THROW 50001, @Message, 1;
	END
	UPDATE Masini
	SET
        Cod_Client = COALESCE(@Cod_Client, Cod_Client),
        NrInmatriculare = COALESCE(@NrInmatriculare, NrInmatriculare),
        VIN = COALESCE(@VIN, VIN),
        Model = COALESCE(@Model, Model),
        AnFabr = COALESCE(@AnFabr, AnFabr),
        TipMotorizare = COALESCE(@TipMotorizare, TipMotorizare),
        CapacitateMotor = COALESCE(@CapacitateMotor, CapacitateMotor),
        CP = COALESCE(@CP, CP),
        KWh = COALESCE(@KWh, KWh),
        Activ = COALESCE(@Activ, Activ)
    WHERE Cod_Masina = @Cod_Masina;

    COMMIT TRANSACTION;
	END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW 50001, @Message, 1;
    END CATCH;
END
GO

GO
CREATE PROCEDURE dezactivareMasina
@Cod_Masina INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
	DECLARE @Message VARCHAR(MAX)
	IF NOT EXISTS (SELECT 1 FROM Masini WHERE Cod_Masina = @Cod_Masina)
	BEGIN;
		SET @Message = 'Masina pe care incerc sa o dezactivez nu exista';
		THROW 50001, @Message, 1;
	END

        UPDATE Masini
        SET Activ = 0
        WHERE Cod_Masina = @Cod_Masina;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW 50001, @Message, 1;
    END CATCH;
END
GO

SELECT c.Nume, c.Prenume, m.* from Clienti c
JOIN Masini m ON c.Cod_Client = m.Cod_Client;


--DROP INDEX Programari.idx_programare_unica;
--CREATE UNIQUE INDEX idx_programare_unica
--ON Programari (Cod_Masina, DataProgramare, IntervalOrar);

GO
CREATE OR ALTER PROCEDURE adaugaProgramare
@Cod_Masina INT,
@DataProgramare DATETIME,
@ModalitateContact VARCHAR(15),
@Actiune VARCHAR(255),
@IntervalOrar TIME,
@DurataProgramare INT
AS
BEGIN
	BEGIN TRANSACTION;
	BEGIN TRY
		--check daca exista masina
		IF NOT EXISTS (SELECT 1 FROM Masini WHERE Cod_Masina = @Cod_Masina)
		BEGIN;
			THROW 50001, 'Masina nu exista', 1;
		END

		DECLARE @IntervalInchis TIME(0) = DATEADD(MINUTE, @DurataProgramare, @IntervalOrar);
		IF (DATEPART(HOUR, @IntervalInchis) > 17 OR (DATEPART(HOUR, @IntervalInchis) = 17 AND DATEPART(MINUTE, @IntervalInchis) > 0))
		BEGIN;
			THROW 50001, 'Durata programarii depaseste ora inchiderii 17:00', 1;
		END

		-- ADAUGAT ULTERIOR - prevenire suprapunere la programari
		IF EXISTS (SELECT 1 FROM Programari WHERE DataProgramare = @DataProgramare AND @IntervalOrar < DATEADD(MINUTE, DurataProgramare, IntervalOrar)
		AND DATEADD(MINUTE, @DurataProgramare, @IntervalOrar) > IntervalOrar)
		BEGIN;
			THROW 50001, 'Exista deja o programare in acest interval orar', 1;
		END

		IF (DATEPART(MINUTE, @IntervalOrar) % 30 <> 0)
        BEGIN;
            THROW 50003, 'Intervalul orar trebuie sa inceapa la o ora care este un multiplu de 30 de minute', 1;
        END

		--BEGIN TRANSACTION;
		IF @ModalitateContact NOT IN ('telefon', 'email', 'fizic')
		BEGIN;
		THROW 50001, 'Modalitatea de contact trebuie sa fie ''telefon'', ''email'' sau ''fizic''', 1;
		END
		IF @Actiune NOT IN ('revizie', 'reparatie')
		BEGIN;
		THROW 50002, 'Programarea se face doar pentru revizie sau reparatie', 1;
		END
		IF DATEPART(HOUR, @IntervalOrar) < 8 OR DATEPART(HOUR, @IntervalOrar) > 17
		BEGIN;
			THROW 50003, 'Intervalul orar trebuie sa fie intre 8 si 17', 1;
		END
		IF @DurataProgramare % 30 != 0 OR @DurataProgramare <= 0
		BEGIN;
			THROW 50004, 'Programarea trebuie sa dureze minim 30 de minute si sa fie multiplu de 30 de minute', 1;
			--PRINT 'Programarea trebuie sa dureze minim 30 de minute si sa fie multiplu de 30 de minute'
		END

		INSERT INTO Programari (Cod_Masina, DataProgramare, ModalitateContact, Actiune, IntervalOrar, DurataProgramare)
		VALUES (@Cod_Masina, @DataProgramare, @ModalitateContact, @Actiune, @IntervalOrar, @DurataProgramare)

		--adaugat ulterior
		DECLARE @Cod_Programare INT = SCOPE_IDENTITY();
		INSERT INTO IstoricService (Cod_Programare, Cod_Masina, Status)
		VALUES (@Cod_programare, @Cod_Masina, 1)

		COMMIT TRANSACTION;
		PRINT 'Programarea a fost adaugata si s-a creat inregistrarea in istoric';
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		--DECLARE @ErrorMessage VARCHAR(MAX);
		--SET @ErrorMessage = ERROR_MESSAGE();
		THROW;
		--PRINT 'Eroare la introducerea programarii: ' + @ErrorMessage;
	END CATCH;
END
GO

--nu mai este actuala
GO
CREATE PROCEDURE updateIstoricServiceStatus
@Cod_Istoric INT,
@NewStatus TINYINT,
@DataPrimire DATE = NULL,
@ProblemeMentionate VARCHAR(499) = NULL,
@ProblemeVizualeConstatate VARCHAR(499) = NULL,
@OperatiuniEfectuate VARCHAR(499) = NULL,
@PieseSchimbate VARCHAR(499) = NULL,
@PieseReparate VARCHAR(499) = NULL,
@AlteProblemeDescoperite VARCHAR(499) = NULL,
@AlteReparatii VARCHAR(499) = NULL,
@DurataReparatie INT = NULL
AS
BEGIN
	UPDATE IstoricService
	SET Status = @NewStatus,
		DataPrimire = CASE WHEN @NewStatus >= 1 THEN COALESCE(@DataPrimire, DataPrimire) ELSE DataPrimire END,
		ProblemeMentionate = CASE WHEN @NewStatus >= 2 THEN COALESCE(@ProblemeMentionate, ProblemeMentionate) ELSE ProblemeMentionate END,
        ProblemeVizualeConstatate = CASE WHEN @NewStatus >= 2 THEN COALESCE(@ProblemeVizualeConstatate, ProblemeVizualeConstatate) ELSE ProblemeVizualeConstatate END,
        OperatiuniEfectuate = CASE WHEN @NewStatus = 3 THEN COALESCE(@OperatiuniEfectuate, OperatiuniEfectuate) ELSE OperatiuniEfectuate END,
        PieseSchimbate = CASE WHEN @NewStatus = 3 THEN COALESCE(@PieseSchimbate, PieseSchimbate) ELSE PieseSchimbate END,
        PieseReparate = CASE WHEN @NewStatus = 3 THEN COALESCE(@PieseReparate, PieseReparate) ELSE PieseReparate END,
        AlteProblemeDescoperite = CASE WHEN @NewStatus = 3 THEN COALESCE(@AlteProblemeDescoperite, AlteProblemeDescoperite) ELSE AlteProblemeDescoperite END,
        AlteReparatii = CASE WHEN @NewStatus = 3 THEN COALESCE(@AlteReparatii, AlteReparatii) ELSE AlteReparatii END,
        DurataReparatie = CASE WHEN @NewStatus = 3 THEN COALESCE(@DurataReparatie, DurataReparatie) ELSE DurataReparatie END
    WHERE Cod_Istoric = @Cod_Istoric;
END
GO

GO
CREATE OR ALTER PROCEDURE updateIstoricServiceStatus2
    @Cod_Istoric INT,
    @DataPrimire DATETIME,
    @ProblemeMentionate VARCHAR(499),
    @ProblemeVizualeConstatate VARCHAR(499)
AS
BEGIN
    IF (SELECT Status FROM IstoricService WHERE Cod_Istoric = @Cod_Istoric) <= 2
    BEGIN
        UPDATE IstoricService
        SET Status = 2,
            DataPrimire = @DataPrimire,
            ProblemeMentionate = @ProblemeMentionate,
            ProblemeVizualeConstatate = @ProblemeVizualeConstatate
        WHERE Cod_Istoric = @Cod_Istoric;
    END
    ELSE
    BEGIN;
        THROW 500001, 'Nu se poate seta status-ul la o valoare mai mica decat cea curenta', 1;
    END
END
GO

GO
CREATE OR ALTER PROCEDURE updateIstoricServiceStatus3
    @Cod_Istoric INT,
    @OperatiuniEfectuate VARCHAR(499),
    @PieseSchimbate VARCHAR(499),
    @PieseReparate VARCHAR(499),
    @AlteProblemeDescoperite VARCHAR(499),
    @AlteReparatii VARCHAR(499),
    @DurataReparatie INT
AS
BEGIN
    IF (SELECT Status FROM IstoricService WHERE Cod_Istoric = @Cod_Istoric) <= 3
    BEGIN
        UPDATE IstoricService
        SET Status = 3,
            OperatiuniEfectuate = @OperatiuniEfectuate,
            PieseSchimbate = @PieseSchimbate,
            PieseReparate = @PieseReparate,
            AlteProblemeDescoperite = @AlteProblemeDescoperite,
            AlteReparatii = @AlteReparatii,
            DurataReparatie = @DurataReparatie
        WHERE Cod_Istoric = @Cod_Istoric;
    END
    ELSE
    BEGIN;
        THROW 500001, 'Nu se poate seta status-ul la o valoare mai mica decat cea curenta', 1;
    END
END
GO

SELECT * FROM Masini;
EXEC adaugaProgramare @Cod_Masina = 1, @DataProgramare = '9/08/2024', @ModalitateContact = 'telefon', @Actiune = 'revizie', @IntervalOrar = '12:00', @DurataProgramare = 60;
EXEC adaugaProgramare @Cod_Masina = 1, @DataProgramare = '11/08/2024', @ModalitateContact = 'email', @Actiune = 'reparatie', @IntervalOrar = '10:00', @DurataProgramare = 90;
EXEC adaugaProgramare @Cod_Masina = 3, @DataProgramare = '11/08/2024', @ModalitateContact = 'email', @Actiune = 'reparatie', @IntervalOrar = '08:30', @DurataProgramare = 30;
EXEC adaugaProgramare @Cod_Masina = 3, @DataProgramare = '12/08/2024', @ModalitateContact = 'fizic', @Actiune = 'reparatie', @IntervalOrar = '16:00', @DurataProgramare = 30;
EXEC adaugaProgramare @Cod_Masina = 3, @DataProgramare = '13/08/2024', @ModalitateContact = 'email', @Actiune = 'reparatie', @IntervalOrar = '11:30', @DurataProgramare = 30;

SELECT * FROM Programari;
SELECT * FROM IstoricService;

EXEC updateIstoricServiceStatus2 @Cod_Istoric = 1, @DataPrimire = '10/08/2024', @ProblemeMentionate = 'fara probleme vericule', @ProblemeVizualeConstatate = 'e turbata varule';
EXEC updateIstoricServiceStatus3 @Cod_Istoric = 1, @OperatiuniEfectuate = 'i-am facut testul cu moneda', @PieseSchimbate = ' asta ',  @PieseReparate ='N/A',
  @AlteProblemeDescoperite = 'na' , @AlteReparatii = 'na',@DurataReparatie= 30;
