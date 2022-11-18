const path = require("path");
const fs = require("fs");
const usersFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const { validationResult} = require("express-validator")
const UserModel = require("../models/user.js")
const bcrypt = require('bcryptjs');
let db = require("../database/models")

const userController = {

    register:(req,res)=>{
        res.render("register")
    },

    register2: async function  (req, res) {
    let db = require("../database/models")
    let errors = validationResult(req)
    try {
        if (errors.isEmpty()) {
            
            const userNew = {
                user_id: Date.now(),
                user_name: req.body.name,
                user_email: req.body.email,
                user_adress: req.body.adress,
                user_pass: bcrypt.hashSync(req.body.password, 10),
                user_image: "img_user_default.png"
            };
            

            if (req.file) {
                userNew.user_image = req.file.filename;
            }

            let encontrarEmail = await db.user.findOne({
                where:{
                    user_email : req.body.email
                }
            })
            
            if (encontrarEmail) {
                res.render('register', {
                    errors: {
                        user_email: {
                            msg: "Este email ya esta registrado"
                        }
                    },
                    old: req.body
                })
            } else {

                await db.user.create(userNew);

                res.redirect("/user/login");
            }
            

        } else {
            res.render('register', {
                errors: errors.mapped(),
                old: req.body
            })
        }
        } catch (error) {
        console.log(error);
    }   
},


        //Mostrar formulario de login//
login: (req, res) => {
    res.render("login")
},

//Loguearse//
login2: async function (req, res) {
    let errors = validationResult(req)
    try {
        if (errors.isEmpty()) {

            let userToLog = await db.user.findOne({
                where:{
                    user_email : req.body.email
                }
            })  
            
            if (userToLog) {
                let isOkThePass = bcrypt.compareSync(req.body.password, userToLog.user_pass)        
                if (isOkThePass) {
                    delete userToLog.password;
                    req.session.userLogged = userToLog;
                    if (req.body.recordarme) {
                        res.cookie('recordarEmail', req.body.email, { maxAge: 90000 })
                    }
                    return res.redirect("perfil/:id" + userToLog.user_id);
                } else {
                    return res.render("login", {
                        errors: {
                            user_email: {
                                msg: "Las credenciales son inválidas"
                            }
                        }
                    })
                }
            } else {
                res.render("login", {
                    errors: {
                        user_email: {
                            msg: "Este email no está registrado"
                        }
                    }
                })
            }
        } else {
            res.render('login', {
                errors: errors.mapped(),
                old: req.body
            })
        }

    } catch (error) {
        console.log(error);
}
  

},


perfil: (req, res) => {
    return res.render("perfil", {
        user: req.session.userLogged
    });
},
logout: (req, res) => {
    res.clearCookie('recordarEmail');
    req.session.destroy();
    return res.redirect('/');
},
 
};

module.exports = userController;