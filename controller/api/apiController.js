const db = require("../../database/models");
const sequelize = db.sequelize;


let apiController = {
    apiUser: (req, res) => {
        return res.json("Hola")
    },

    apiProduct: (req, res) => {
        return res.json("Hola")
    }
}


module.exports = apiController;