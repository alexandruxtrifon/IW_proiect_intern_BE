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
CREATE OR ALTER PROCEDURE getClienti
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