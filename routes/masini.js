const express = require('express');
const router = express.Router();
const controllerMasini = require('../controller/controllerMasini');

router.post('/', controllerMasini.adaugareMasina);
router.put('/:id', controllerMasini.actualizareMasina);
router.put('/dezactivare/:id', controllerMasini.dezactivareMasina);


module.exports = router;