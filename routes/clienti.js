const express = require('express');
const router = express.Router();
const controllerClienti = require('../controller/controllerClienti');

router.post('/', controllerClienti.adaugareClient);
router.patch('/:id', controllerClienti.actualizareClient);
router.patch('/dezactivare/:id', controllerClienti.dezactivareClient);
router.get('/', controllerClienti.getClienti);
router.get('/activi', controllerClienti.getClientiActivi);
router.get('/inactivi', controllerClienti.getClientiInactivi);


module.exports = router;