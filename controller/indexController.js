const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../Data/productsData.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require("../database/models");
const sequelize = db.sequelize;



const indexController = {

    home: async function(req, res) {
        try{
            let laLiga = await db.product.findAll({
                where: { category_id: 1 }
            })

            let premierLeague = await db.product.findAll({
                where: { category_id: 2 }
            })
            let bundesliga = await db.product.findAll({
                where: { category_id: 3 }
            })
            let ligue1 = await db.product.findAll({
                where: { category_id: 4 }
            })
            let primeraDivisionArgentina = await db.product.findAll({
                where: { category_id: 5 }
            })
            let primeraDivisionColombiana = await db.product.findAll({
                where: { category_id: 6 }
            })
            let seleccionesDelMundo = await db.product.findAll({
                where: { category_id: 7 }
            })

            Promise.all([ laLiga, premierLeague, bundesliga, ligue1, primeraDivisionArgentina, primeraDivisionColombiana, seleccionesDelMundo])
            return res.render("home", {laLiga, premierLeague, bundesliga, ligue1, primeraDivisionArgentina, primeraDivisionColombiana, seleccionesDelMundo})
        }catch (error) {
            console.log(error);
        }
    },


    //Mostraba sin filtrar
        // home:(req,res)=> {
        //     let LaLiga = db.product.findAll({where:{category_id: 1}})
                

        //   db.product.findAll()
        //   .then((resultado) => {
            
        //     return res.render("home", 
        //     { resultado, LaLiga}
        //     )
        //   })
        // },


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
            // preguntar si el usuario subio una imagen y si si asignarla.
             if (req.files) {
                productNew.product_image_front = req.files[0].filename
                productNew.product_image_back = req.files[1].filename
            }
            
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