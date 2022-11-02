const db = require("../database/models");
const sequelize = db.sequelize;

// filtrar las camisetas por liga
const indexController = {
    home:(req,res)=> {
      db.products.findAll()
      .then((resultado) => {
        console.log("///////////////////////////////////////////");
        console.log(resultado);
        return res.render("home", { resultado })
      })
    },

cart:(req,res)=>{
      res.render("product-cart")
    },

    detail:(req,res)=>{
      
      db.products.findOne({
        where:{
          product_id: req.params.id
        }
      })
      .then((resultado) =>{
        return res.render("/product-detail", { resultado })
      })

    },

    crea:(req,res)=>{
      db.categorys.findAll()
      .then(function (categorias){
          res.render("crea", {categorias:categorias})})
    },
    
    store: (req, res) => {
      const productNew = {
        id: req.body.product_id,
             name: req.body.product_name,
             price: req.body.product_price,
             description: req.body.product_description,
             image_front: "image-default.png",
             image_back: "image-default.png",
      }
      if (req.files) {
          productNew.image_front = req.files[0].filename
          productNew.image_back = req.files[1].filename
        }}
};
        
module.exports = indexController;