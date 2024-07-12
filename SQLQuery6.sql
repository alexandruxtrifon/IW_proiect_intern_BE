USE [internship2024]

SELECT * FROM ClientContactInfo;
EXEC getClientiInactivi;
SELECT * FROM Programari;

DELETE FROM Clienti;
EXEC InsertClient2 @Nume = 'Stan', @Prenume = 'Mihai', @Email = 's.tan.mihai@gmail.com', @NrTel = '0112345688,0711147678', @Activ =1;
EXEC InsertClient2 @Nume = 'Andrei', @Prenume = 'Gigel', @Email = 'andreigigel@gmail.com', @NrTel = '0712345578', @Activ =1;
EXEC InsertClient2 @Nume = 'Popescu', @Prenume = 'Mihaiii', @Email = 'popescu.mihai@gmail.com', @Activ =1;
EXEC InsertClient2 @Nume = 'Dumitru', @Prenume = 'Ion', @NrTel = '0712345678', @Activ =1;
EXEC InsertClient2 @Nume = 'Dumnezei', @Prenume = 'Ionel', @Activ =1, @NrTel = 'ggfkjh';
EXEC InsertClient2 @Nume = 'Mati', @Prenume = 'Cristi', @NrTel = '0712345678,       0712345678', @Activ =1;

EXEC adaugareMasina @Cod_Client = 2, @NrInmatriculare='AC488VCD', @VIN='1HD1FAL11NY500561', @Model='Octavia', @AnFabr=2050, 
            @TipMotorizare='benzina', @CapacitateMotor=2.0, @CP=150, @KWh=NULL;
			SELECT * FROM Masini;

			INSERT INTO Masini (Cod_Client, Cod_Marca, NrInmatriculare, VIN, Model, AnFabr, TipMotorizare, CapacitateMotor, CP, KWh)
VALUES
  (1, 1, 'BU123ABC', '1HD1FAL11NY500561', 'Dacia Logan', 2020, 'benzina', 1.6, 100, NULL),
  (2, 3, 'AB123ECD', '1YVHP84DX55N13025', 'BMW X5', 2022, 'diesel', 3.0, 300, NULL),
  (3, 2, 'TM345JEF', '3D73Y3CL6BG585460', 'Tesla Model 3', 2023, 'electric', NULL, 350, 100.00);
SELECT * FROM ClientContactInfo;

