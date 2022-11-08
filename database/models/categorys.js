module.exports = function(sequelize, dataTypes) {
    let alias = "category";

    let cols = {
        category_id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            
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
        Category.hasMany(models.product, {

            as: "product",
            foreignKey: "category_id"
        })
    }

    return Category;

}