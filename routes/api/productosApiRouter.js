const express = require("express")
const productosApiController = require ("../../controller/api/productosApiController");
const router = express.Router();


router.get("/", productosApiController.list);

router.get("/categorias", productosApiController.category);

router.post("/", productosApiController.store);

router.get("/:id", productosApiController.detail);

module.exports = router;