USE internship2024

GO
CREATE OR ALTER PROCEDURE getProgramari
--@DataProgramare DATE = NULL
@StartDate DATE = NULL,
@EndDate DATE = NULL
AS
BEGIN

    SELECT 
        p.Cod_Programare, p.Cod_Masina, FORMAT(p.DataProgramare, 'dd/MM/yyyy') AS DataProgramare, p.ModalitateContact, p.Actiune, CONCAT(FORMAT(CAST(p.IntervalOrar AS TIME), N'hh\:mm'), ' - ', FORMAT(DATEADD(MINUTE, p.DurataProgramare, p.IntervalOrar), N'hh\:mm')) AS IntervalOrar, p.DurataProgramare, m.Model
    FROM 
        Programari p
    JOIN 
        Masini m ON p.Cod_Masina = m.Cod_Masina
	--WHERE (@DataProgramare IS NULL OR CONVERT(DATE, DataProgramare) = @DataProgramare)
    WHERE (@StartDate IS NULL OR DataProgramare >= @StartDate) AND (@EndDate IS NULL OR DataProgramare <= @EndDate)
	ORDER BY
	DataProgramare, IntervalOrar;
END
GO

exec getProgramari @DataProgramare = '08/13/2024'

EXEC getIstoricMasina @Cod_Masina = 2

GO
CREATE OR ALTER PROCEDURE getIstoricMasina
    @Cod_Masina INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF @Cod_Masina IS NULL
    BEGIN;
        THROW 50001,'Codul masinii nu poate fi null.', 1;
        RETURN;
    END

    BEGIN TRY
        SELECT 
            Cod_Istoric,
            Cod_Programare,
            Status,
            FORMAT(DataPrimire, 'dd/MM/yyyy') AS DataPrimire,
            ProblemeMentionate,
            ProblemeVizualeConstatate,
            OperatiuniEfectuate,
            PieseSchimbate,
            PieseReparate,
            AlteProblemeDescoperite,
            AlteReparatii,
            DurataReparatie
        FROM 
            IstoricService
        WHERE 
            Cod_Masina = @Cod_Masina
        ORDER BY 
            DataPrimire DESC
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH;
END
GO


CREATE OR ALTER PROCEDURE getClientiInternal
    @Activ BIT = NULL
AS
BEGIN
    SELECT c.Cod_Client,
           c.Nume,
           c.Prenume,
           c.Email,
           STRING_AGG(t.NrTel, ', ') AS NrTelefon,
		   c.Activ
    FROM Clienti c
    JOIN Telefon t ON c.Cod_Client = t.Cod_Client
    WHERE (@Activ IS NULL OR c.Activ = @Activ)
    GROUP BY c.Cod_Client, c.Nume, c.Prenume, c.Email, c.Activ;
END
GO

GO
CREATE OR ALTER PROCEDURE getClientiActivi
AS
BEGIN
    EXEC getClientiInternal @Activ = 1;
END
GO

GO
CREATE OR ALTER PROCEDURE getClientiInactivi
AS
BEGIN
	EXEC getClientiInternal @Activ = 0;
END
GO

exec getclientiactivi
exec getclientiinactivi


GO
CREATE OR ALTER PROCEDURE getTelefoaneClient
@Cod_Client INT
AS
BEGIN
    SELECT Cod_Telefon, NrTel AS NrTelefon
    FROM Telefon
	WHERE Cod_Client = @Cod_Client
END
GO

GO
CREATE OR ALTER PROCEDURE actualizareTelefonClient
    @Cod_Client INT,
    @Cod_Telefon INT,
    @NrTel VARCHAR(MAX)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @Error VARCHAR(MAX);

        IF @NrTel LIKE '%[^0-9]%'
		    BEGIN
                SET @Error = 'Numarul de telefon nu poate sa contina altceva decat cifre';
				THROW 50001, @Error, 1;
            END
		
		IF LEN(@NrTel) != 10
			BEGIN
				SET @Error = 'Numarul de telefon trebuie sa aiba 10 cifre';
				THROW 50002, @Error, 1;
			END

		IF LEFT(@NrTel, 2) NOT IN ('02', '03', '07')
        BEGIN
            SET @Error = 'Numarul de telefon trebuie sa aiba prefix romanesc (02, 03, sau 07)';
            THROW 50003, @Error, 1;
        END

			UPDATE Telefon
			SET NrTel = @NrTel
			WHERE Cod_Client = @Cod_Client
			AND Cod_Telefon = @Cod_Telefon


        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END
GO

EXEC getTelefoaneClient @Cod_Client = 1;