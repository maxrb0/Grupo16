module.exports = function(sequelize, dataTypes) {
    let alias = "product";

    let cols = {
        product_id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_name:{
            type: dataTypes.STRING
        },
        product_price:{
            type: dataTypes.INTEGER
        },
        product_description:{
            type: dataTypes.STRING
        },
        product_image_front:{
            type: dataTypes.STRING
        },
        product_image_back:{
            type: dataTypes.STRING
        },
        category_id:{
            type: dataTypes.INTEGER
        },
        detail: {
            type: dataTypes.VIRTUAL,
            get() {
                return '/api/products/' + this.product_id;
            },
        },

        url_img_front: {
            type: dataTypes.VIRTUAL,
            get() {
                return '/design/images-products/' + this.product_image_front;
                
            },
        }, 
        url_img_back: {
            type: dataTypes.VIRTUAL,
            get() {
                return '/design/images-products/' + this.product_image_back;
                
            },
        }
        

    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);


    


    Product.associate = function(models){
        Product.hasMany(models.orders_products, {

            as: "orders_products",
            foreignkey: "orders_products_id"
        })
        Product.belongsTo(models.category, {
            as: "category",
            foreignKey: "category_id",
        })
       
    }

    return Product;

}