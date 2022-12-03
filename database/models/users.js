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
        },
        detail: {
            type: dataTypes.VIRTUAL,
            get() {
                return '/api/users/detalle/' + this.user_id;
            },
        },
        url_img: {
            type: dataTypes.VIRTUAL,
            get() {
                return '/design/images-users/' + this.user_image;
            },
        }
    }

    let config = {
        tableName: "users",
        timestamps: false, 
    }

    let users = sequelize.define(alias, cols, config);

    return users;
}