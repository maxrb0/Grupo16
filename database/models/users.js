module.exports = function (sequelize, dataTypes){
    let alias = "user";

    let cols = {
user_id: {
    type : dataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true
},

user_name: {
    type: dataTypes.STRING 
},

user_email: {
    type: dataTypes.STRING,
    unique: true,
    },

user_adress: {
        type: dataTypes.STRING
        },

user_pass: {
        type: dataTypes.STRING
        },
user_image: {
        type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "users",
        timestamps: false, 
    }

    let users = sequelize.define(alias, cols, config);

    return users;
}