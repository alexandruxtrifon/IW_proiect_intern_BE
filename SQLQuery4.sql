USE [internship2024]
GO

DECLARE @RC int
DECLARE @Nume varchar(30) = 'nume'
DECLARE @Prenume varchar(30) = ''
DECLARE @Email varchar(50) = 'aaa@bbbb.com'
DECLARE @NrTel varchar(max) = '0723456978'
DECLARE @Activ bit = 2


-- TODO: Set parameter values here.

SELECT * FROM Clienti;

EXECUTE @RC = [intern].[InsertClient2] 
   @Nume
  ,@Prenume
  ,@Email
  ,@NrTel
  ,@Activ
GO


