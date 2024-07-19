const express = require('express');
const router = express.Router();
const controllerMasini = require('../controller/controllerMasini');

router.get('/', controllerMasini.getMasini);
router.post('/', controllerMasini.adaugareMasina);
router.put('/:id', controllerMasini.actualizareMasina);
router.patch('/:id', controllerMasini.dezactivareMasina);
router.get('/client/:id', controllerMasini.getMasiniClient);

module.exports = router;