USE internship2024

GO
CREATE OR ALTER PROCEDURE getProgramari
AS
BEGIN

    SELECT 
        p.Cod_Programare, p.Cod_Masina, FORMAT(p.DataProgramare, 'dd/MM/yyyy') AS DataProgramare, p.ModalitateContact, p.Actiune, CONCAT(FORMAT(CAST(p.IntervalOrar AS TIME), N'hh\:mm'), ' - ', FORMAT(DATEADD(MINUTE, p.DurataProgramare, p.IntervalOrar), N'hh\:mm')) AS IntervalOrar, p.DurataProgramare, m.Model
    FROM 
        Programari p
    JOIN 
        Masini m ON p.Cod_Masina = m.Cod_Masina
END
GO

exec getProgramari

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
CREATE OR ALTER PROCEDURE getMasiniByClientID
AS
BEGIN
