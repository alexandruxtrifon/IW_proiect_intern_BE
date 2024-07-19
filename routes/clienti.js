const express = require('express');
const router = express.Router();
const controllerClienti = require('../controller/controllerClienti');

router.post('/', controllerClienti.adaugareClient);
router.put('/:id', controllerClienti.actualizareStatusClient);
//router.patch('/dezactivare/:id', controllerClienti.dezactivareClient);
router.patch('/:id', controllerClienti.actualizareClient);
router.get('/', controllerClienti.getClientiquery);
//router.get('/activi', controllerClienti.getClientiActivi);// un singur get
//router.get('/inactivi', controllerClienti.getClientiInactivi);// ^^


router.get('/:id/telefon', controllerClienti.getTelefonClient);
router.patch('/:idClient/telefon/:idTelefon', controllerClienti.actualizareTelefonClient)

//la router put id merge sa dezactivez prin body - de verificat
module.exports = router;