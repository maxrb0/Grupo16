const db = require("../../database/models");

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args))



const usuariosApiController = {
    list: (req, res) => {
        db.user.findAll(
            {
                attributes: ["user_id", 'user_name', "user_email", "user_adress", "detail", "url_img", "user_image"]
            }
        )
            .then(lista => {
                return res.json(
                    {
                        total: lista.length,
                        data: lista,
                    })

            })
    }, 
    detail: (req, res) => {

        db.user.findByPk(req.params.id,
            {
                attributes: ['user_name', "user_email", "user_adress", "user_id", "url_img", "user_image"]
            })
            .then((lista) => {
                res.json({
                    data: lista,

                });
            });
    },
    lastUser: (req, res) => {
        db.user.findAll(
            {
                attributes: ["user_id", 'user_name', "user_adress", "user_email", "detail", "url_img", "user_image"]
            }
        )
            .then(user => {

                console.log(user);
                let lastUser = user.pop()
                console.log(lastUser);
                res
                    .status(200)
                    .json({
                        data: lastUser
                    })
            })
    }
}


module.exports = usuariosApiController;