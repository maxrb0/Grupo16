module.exports = function(sequelize, dataTypes) {
    let alias = "categorys";

    let cols = {
        category_id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_name:{
            type: dataTypes.STRING
        }

    }

    let config = {
        tableName: "categorys",
        timestamps: false
    }

    let Category = sequelize.define(alias, cols, config);

    Category.associate = function(models){
        Category.hasMany(models.products, {

            as: "products",
            foreignkey: "category_id"
        })
    }

    return Category;

}