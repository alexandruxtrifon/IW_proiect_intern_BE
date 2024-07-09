const express = require('express');
const router = express.Router();
const controllerIstoric = require('../controller/controllerIstoric');

router.put('/2/:id', controllerIstoric.actualizareIstoric2);
router.put('/3/:id', controllerIstoric.actualizareIstoric3);

module.exports = router;