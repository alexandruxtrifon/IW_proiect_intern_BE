USE [internship2024]
GO

DECLARE @RC int
DECLARE @Cod_Client int = 7
DECLARE @Nume varchar(30) 
DECLARE @Prenume varchar(30) 
DECLARE @Email varchar(50) 
DECLARE @NrTel varchar(max)  = '0345681239'
DECLARE @Activ bit = 0
--SELECT * FROM Clienti;
-- TODO: Set parameter values here.
--SELECT * FROM ClientContactInfo;
SELECT * FROM Telefon WHERE Cod_Client = 7;
SELECT * FROM Masini WHERE Cod_Client = 7;
EXECUTE @RC = [intern].[UpdateClient] 
   @Cod_Client
  ,@Nume
  ,@Prenume
  ,@Email
  ,@NrTel
  ,@Activ
GO


