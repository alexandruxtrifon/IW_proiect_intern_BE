USE internship2024

GO
CREATE OR ALTER TRIGGER trg_programare_unica
ON Programari
AFTER INSERT
AS
BEGIN
    IF EXISTS (SELECT 1
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

GO
CREATE OR ALTER TRIGGER trg_ActualizareTelefonDuplicat
ON Telefon
AFTER UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM inserted i
        JOIN inserted d ON i.Cod_Telefon = d.Cod_Telefon
        WHERE i.NrTel = d.NrTel
    )
    BEGIN;
        THROW 50007, 'Nu este permisa schimbarea numarului de telefon cu acelasi numar existent', 1;
        ROLLBACK TRANSACTION;
    END
END
GO

GO
CREATE OR ALTER TRIGGER trg_InsertTelefonDuplicat
ON Telefon
AFTER INSERT
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM inserted i
        JOIN inserted t ON i.NrTel = t.NrTel
        WHERE i.Cod_Telefon <> t.Cod_Telefon)
    BEGIN;
        THROW 50001, 'Numarul de telefon se afla deja in baza de date', 1;
        ROLLBACK TRANSACTION;
    END
END
GO


GO
CREATE OR ALTER TRIGGER trg_InsertEmailDuplicat
ON Clienti
AFTER INSERT
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM inserted i
        JOIN Clienti c ON i.Email = c.Email
        WHERE i.Cod_Client <> c.Cod_Client)
    BEGIN;
        THROW 50001, 'Emailul se afla deja in baza de date', 1;
        ROLLBACK TRANSACTION;
    END
END
GO