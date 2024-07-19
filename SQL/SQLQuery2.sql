USE [internship2024]
GO
/****** Object:  StoredProcedure [intern].[actualizareTelefonClient]    Script Date: 15-Jul-24 11:51:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [intern].[actualizareTelefonClient]
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
