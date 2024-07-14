USE internship2024

GO
CREATE OR ALTER FUNCTION validareClientUpdate(
    @Nume VARCHAR(MAX), 
    @Prenume VARCHAR(MAX), 
    @Email VARCHAR(MAX)
    --@Activ BIT, 
    --@NrTel VARCHAR(MAX)
)
RETURNS VARCHAR(MAX)
AS
BEGIN
    DECLARE @User VARCHAR(50)
    DECLARE @MailServer VARCHAR(50)
    DECLARE @Domeniu VARCHAR(50)
    DECLARE @Error VARCHAR(MAX) = 'valid';
    
    IF @Nume IS NOT NULL AND @Nume LIKE '%[^a-zA-Z%]'
    BEGIN
        SET @Error = 'Numele poate fi alcatuit numai din litere'
        RETURN @Error;
    END

    --IF @Activ IS NOT NULL AND @Activ NOT IN (0, 1)
    --BEGIN;
    --    SET @Error = 'Trebuie specificat daca clientul este Activ(1) sau Inactiv(0)';
    --    RETURN @Error;
    --END

    IF @Nume IS NOT NULL AND LEN(@Nume) < 3 
    BEGIN;
        SET @Error = 'Numele este prea scurt'
        RETURN @Error;
    END

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
                RETURN @Error;
            END
    
            ELSE IF LEN(@Domeniu) > 5 
            BEGIN;
                SET @Error = 'Domeniul emailului trebuie sa aiba maxim 5 caractere.'
                RETURN @Error;
            END
        END
        ELSE
        BEGIN;
            SET @Error = 'Formatul emailului este incorect.'
            RETURN @Error;
        END
    END

    RETURN @Error;
END
GO

SELECT * FROM Telefon

SELECT * FROM Programari
