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

    //     const laLiga = products.filter((p) => p.category == "1");
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
          db.product.findAll()
          .then((resultado) => {
            console.log("///////////////////////////////////////");
            console.log(resultado);
            return res.render("home", { resultado })
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

    crea:(req, res) => {
        db.categorys.findAll()
        .then(function(categorias){
            res.render("crea",  {categorias:categorias})}) 
    },

    store: (req, res) => {

        const productNew = {
            product_name: req.body.nameCamiseta,
            product_price: req.body.priceCamiseta,
            categorys: req.body.category,
            product_description: req.body.descriptonCamiseta,
            product_image_front: "image-default.png",
            product_image_back: "image-default.png"
        };

        if (req.files) {
            productNew.product_image_front = req.files[0].filename
            productNew.product_image_back = req.files[1].filename
        }


        db.Product.crea(productNew)
        .then(function () {
            res.redirect("/");
        })
    },



    
    edit:(req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

        const productoToEdit = products.find((p) => p.id == req.params.id);
        res.render("edit", { pToEdit: productoToEdit });
    },

    update: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

        products.forEach((p) => {
            if (p.id == req.params.id) {
                p.name =   req.body.nameCamiseta,
                p.price = req.body.priceCamiseta,
                p.category =  req.body.category,
                p.description =  req.body.descriptonCamiseta
            

                if (req.file) {
                    fs.unlinkSync("./public/design/" + p.imageFrente );
                    p.imageFrente = req.file.filename
                  }

                  if (req.file) {
                    fs.unlinkSync("./public/design/" + p.imageBack );
                    p.imageBack = req.file.filename;
                  }
            }
        });


        const data = JSON.stringify(products, null, ' ');
        fs.writeFileSync(productsFilePath, data);

         console.log(req.params.id)

        res.redirect("/product-detail/" + req.params.id);
    },

    delete:(req,res)=>{
        let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        let producto = products.find((p) => p.id == req.params.id);

        products = products.filter((p) => p.id != req.params.id);

        if (producto.imageFrente != "image-default.png") {
            fs.unlinkSync("./public/design/images-products/" + producto.imageFrente);
        }
        if (producto.imageBack != "image-default.png") {
            fs.unlinkSync("./public/design/images-products/" + producto.imageBack);
        }

        let data = JSON.stringify(products, null, " ");
        fs.writeFileSync(productsFilePath, data);

        res.redirect("/")
    },
    
};

module.exports = indexController;