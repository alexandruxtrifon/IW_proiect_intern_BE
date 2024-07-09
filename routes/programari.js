const express = require('express');
const router = express.Router();
const controllerProgramari = require('../controller/controllerProgramari');

router.post('/', controllerProgramari.adaugareProgramare);

module.exports = router;