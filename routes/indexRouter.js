const express = require('express');
const router = express.Router();
const multer = require("multer");
const { body } = require("express-validator");

const indexController = require ("../controller/indexController");



var storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, "public/design/images-products");
  },
  filename: function (req, files, cb) {
    console.log(files );

    cb(null, Date.now() + "" + files.originalname);
  },
});

const upload = multer({ storage });


//validaciones
const validaciones = [
  body("nameCamiseta").notEmpty().withMessage("debes agregar un nombre de camiseta"),
  body("nameCamiseta").isLength({min:5}).withMessage("el nombre debe tener al menos 5 caracteres"),
  body("descriptionCamiseta").notEmpty().withMessage("debes agregar una descripcion"),
  body("descriptionCamiseta").isLength({min:20}).withMessage("la descripcion debe tener al menos 20 caracteres"),
]

//muestra el home
router.get("/",indexController.home);


//Muestra el carrito de productos
router.get("/product-cart",indexController.cart);


//Mustra el detalle de producto
router.get("/product-detail/:id",indexController.detail);


//Eliminar
router.delete("/product-detail/:id", indexController.delete)


//muestra el crear producto
router.get("/crea",indexController.crea);
router.post("/indexRouter/crea", upload.any(), validaciones, indexController.store);
// router.post("/indexRouter/crea", upload.single("imageBack"), indexController.store);



//muestra el editar producto
router.get("/edit/:id",indexController.edit);
router.put("/edit/:id", upload.any("imageFrente","imageBack"), validaciones, indexController.update);
// router.put("/edit/:id", upload.single("imageBack"), indexController.update);





module.exports = router;