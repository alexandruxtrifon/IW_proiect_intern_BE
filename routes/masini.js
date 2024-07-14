const express = require('express');
const router = express.Router();
const controllerMasini = require('../controller/controllerMasini');

router.get('/', controllerMasini.getMasini);
router.post('/', controllerMasini.adaugareMasina);
router.patch('/:id', controllerMasini.actualizareMasina);
router.patch('/dezactivare/:id', controllerMasini.dezactivareMasina);
router.get('/client/:id', controllerMasini.getMasiniClient);

module.exports = router;