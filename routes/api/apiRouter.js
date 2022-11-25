const express = require("express")
const router = express.Router();
const apiController = require ("../../controller/api/apiController");


router.get("/apiUser", apiController.apiUser);

router.get("/apiProduct", apiController.apiProduct);



module.exports = router;