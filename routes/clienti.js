const express = require('express');
const router = express.Router();
const controllerClienti = require('../controller/controllerClienti');

router.post('/', controllerClienti.adaugareClient);
router.put('/:id', controllerClienti.actualizareClient);
router.put('/dezactivare/:id', controllerClienti.dezactivareClient);


module.exports = router;