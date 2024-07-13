USE internship2024

GO
CREATE OR ALTER TRIGGER trg_programare_unica
ON Programari
AFTER INSERT
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM Programari p
        JOIN inserted i ON p.Cod_Masina = i.Cod_Masina
        AND p.DataProgramare = i.DataProgramare
        AND p.IntervalOrar = i.IntervalOrar
        AND p.Cod_Programare != i.Cod_Programare
    )
    BEGIN;
        THROW 50006, 'Aceeasi masina are deja o programare în acelasi interval orar.', 1;
        ROLLBACK TRANSACTION;
    END
END;
GO
SELECT GETDATE()
SELECT CONVERT(VARCHAR(5), CAST(GETDATE() AS TIME))