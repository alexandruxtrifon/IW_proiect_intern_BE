const express = require('express');
const router = express.Router();
const controllerProgramari = require('../controller/controllerProgramari');

router.post('/', controllerProgramari.adaugareProgramare);
router.get('/', controllerProgramari.getProgramari);
router.get('/:dataProgramare', controllerProgramari.getProgramariData)
module.exports = router;