const express = require('express');
const router = express.Router();
const controllerClienti = require('../controller/controllerClienti');

router.post('/', controllerClienti.adaugareClient);
router.patch('/:id', controllerClienti.actualizareClient);
router.patch('/dezactivare/:id', controllerClienti.dezactivareClient);
router.patch('/activare/:id', controllerClienti.activareClient);
router.get('/', controllerClienti.getClienti);
router.get('/activi', controllerClienti.getClientiActivi);
router.get('/inactivi', controllerClienti.getClientiInactivi);
router.get('/:id/telefon', controllerClienti.getTelefonClient);
router.patch('/:idClient/telefon/:idTelefon', controllerClienti.actualizareTelefonClient)


module.exports = router;