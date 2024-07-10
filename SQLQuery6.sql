USE [internship2024]


SELECT * FROM ClientContactInfo;

EXEC InsertClient2 @Nume = 'Stan', @Prenume = 'Mihai', @Email = '.stan@%$^&.mihai@gmail.com', @NrTel = '0712345688,0711147678';
EXEC InsertClient2 @Nume = 'Stan', @Prenume = 'Gigel', @Email = 'stan.mihaifftyg@gmail.com', @NrTel = '0712345578';
EXEC InsertClient2 @Nume = 'Stan', @Prenume = 'Mihaiii', @Email = 'stan.mihaifhgf@gmail.com';
EXEC InsertClient2 @Nume = 'Popescu', @Prenume = 'Ion', @NrTel = '0712345678';
EXEC InsertClient2 @Nume = 'Poghfggpescu', @Prenume = 'Iojhgjhgjhgn';
EXEC InsertClient2 @Nume = 'Popescghfgfho', @Prenume = 'Cristi', @NrTel = '0712345678,       0712345678';



DELETE FROM Clienti;