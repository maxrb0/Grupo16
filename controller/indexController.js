const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../Data/productsData.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require("../database/models");
const sequelize = db.sequelize;



const indexController = {

    // home:(req,res)=>{
    //     const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));


    //     const PremierLeague = products.filter((p) => p.category == "2");
    //     const SeleccionesDelMundo = products.filter((p) => p.category == "3");
    //     const PrimeraDivisionColombiana = products.filter((p) => p.category == "4");
    //     const PrimeraDivisionArgentina = products.filter((p) => p.category == "5");

    //     res.render("home", {
    //         productos: products, toThousand,
    //         Laliga: laLiga,
    //         PremierLeague: PremierLeague,
    //         SeleccionesDelMundo: SeleccionesDelMundo,
    //         PrimeraDivisionColombiana: PrimeraDivisionColombiana,
    //         PrimeraDivisionArgentina: PrimeraDivisionArgentina
    //     });
    // },



        home:(req,res)=> {
            let LaLiga = db.product.findAll({where:{category_id: 1}})
                

          db.product.findAll()
          .then((resultado) => {
            
            return res.render("home", 
            { resultado, LaLiga}
            )
          })
        },


    cart:(req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        res.render("product-cart")
    },

    detail: (req, res) => {

        db.product.findOne({
            where:{
                product_id: req.params.id
            }
        })
		.then((resultado)=>{
			return res.render("product-detail",{ resultado })
		})

       
    },

    // crea:(req, res) => {
    //     db.categorys.findAll()
    //     .then(function(categorias){
    //         res.render("crea",  {categorias:categorias})}) 
    // },

    crea: async function (req, res) {
        try{
            await db.category.findAll()
        .then(function(categorias){
            res.render("crea",  {categorias})
        }) 
        }catch(error) {
            console.log(error);
        }
    },

    store: async function (req, res) {
        try{
            const productNew = {
                product_name: req.body.nameCamiseta,
                product_price: req.body.priceCamiseta,
                category_id: req.body.category,
                product_description: req.body.descriptonCamiseta,
                product_image_front: "image-default.png",
                product_image_back: "image-default.png"
            }
            // preguntar lo de las imagenes

            //Asi no reconoce nunca que tipo de archivo es, si jpg etc, bota la validacion del front
            // if (req.file) {
            //          productNew.product_image_front = req.file.filename
            //          productNew.product_image_back = req.file.filename
            //      }
                 
            //asi no sube sin imagen,  
            // if (req.files) {
            //     productNew.product_image_front = req.files[0].filename
            //     productNew.product_image_back = req.files[1].filename
            // }


            //asi sube sin imagen pero no con imagen
             if (req.files) {
                productNew.product_image_front = req.files[0].filename
                productNew.product_image_back = req.files[1].filename
            }

            //Asi servia en JSON
            // if (req.file) {
            //     productNew.imageFrente = req.file[0].filename
            //     productNew.imageBack = req.file[1].filename
            // }
            
            await db.product.create(productNew)
            .then(function () {
                res.redirect("/");
            })

        }catch (error) {
            console.log(error);
        }
        
        
    },


    edit: async function (req,res) {
        try {
            let productEdit = db.product.findByPk(req.params.id);

            let categorias = db.category.findAll();

            Promise.all([productEdit, categorias])
                .then(function ([pToEdit, categorias]) {
                    return res.render("edit", { pToEdit, categorias });
                })
        } catch (error) {
            console.log(error);
        }
    },


   


    update: async function (req, res) {

        try {

            const pToEdit = {
                product_name: req.body.nameCamiseta,
                product_price: req.body.priceCamiseta,
                category_id: req.body.category,
                product_description: req.body.descriptonCamiseta,
            }
            if (req.files) {
                pToEdit.product_image_front = req.files[0].filename
                pToEdit.product_image_back = req.files[1].filename
            }

            await db.product.update(pToEdit,
                {
                    where: {
                        product_id: req.params.id
                    }
                })
                .then(function () {
                    res.redirect("/product-detail/" + req.params.id);
                })

        } catch (error) {
            console.log(error);
        }
    },

    

    delete: async function (req, res) {
        try {
            await db.product.destroy({
                where: {
                    product_id: req.params.id
                }
            })
            res.redirect("/")
        } catch (error) {
            console.log(error);
        }

    }
    
};

module.exports = indexController;