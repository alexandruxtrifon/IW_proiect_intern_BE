const express = require('express');
const router = express.Router();
const controllerIstoric = require('../controller/controllerIstoric');

router.patch('/2/:id', controllerIstoric.actualizareIstoric2);
router.patch('/3/:id', controllerIstoric.actualizareIstoric3);
router.get('/masina/:id', controllerIstoric.getIstoricMasina);
module.exports = router;