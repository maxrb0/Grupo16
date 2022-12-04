const db = require("../../database/models");



const productosApiController = {
    
    list: async function (req, res) {
        try {
            let productos = await db.product.findAll();

            let categorias = await db.category.findAll();

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

            Promise.all([productos, categorias, laLiga, premierLeague, bundesliga, ligue1, primeraDivisionArgentina, primeraDivisionColombiana, seleccionesDelMundo])
            return res.status(200).json({
                total: productos.length,
                laLiga: laLiga.length,
                premierLeague: premierLeague.length,
                bundesliga: bundesliga.length,
                ligue1: ligue1.length,
                primeraDivisionArgentina: primeraDivisionArgentina.length,
                primeraDivisionColombiana: primeraDivisionColombiana.length,
                seleccionesDelMundo: seleccionesDelMundo.length,
                data: productos,
                status: 200
            });

        } catch (error) {
            console.log(error);
        }
    },
    detail: (req, res) => {
        //findByPk es encontrar por primary key
        db.product.findByPk(req.params.id, { include: ["category"] })
            .then((product) => {
                res.status(200).json({
                    data: product,
                    status: 200
                });
            });
    },
    store: (req, res) => {

        db.product.create(req.body, { include: ["category"] })
            .then((product) => {
                res.status(200).json({
                    data: product,
                    status: 200,
                    created: "ok"
                });
            });
    },
    category: (req, res) => {
        db.category.findAll(
            {
                attributes: ["category_name"]
            }
        )
            .then(lista => {
                console.log(lista)
                return res.json(
                    {
                        data: lista,
                    })

            })
    },

}



module.exports = productosApiController;