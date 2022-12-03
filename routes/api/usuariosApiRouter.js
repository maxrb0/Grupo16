const express = require('express');
const router = express.Router();
const usuariosApiController = require('../../controller/api/usuariosApiController');



router.get("/", usuariosApiController.list);
router.get("/lastUser", usuariosApiController.lastUser)
router.get("/detalle/:id", usuariosApiController.detail);


module.exports = router