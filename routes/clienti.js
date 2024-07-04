const express = require('express');
const router = express.Router();
const controllerClienti = require('../controller/controllerClienti');

router.post('/', controllerClienti.adaugareClient);

module.exports = router;