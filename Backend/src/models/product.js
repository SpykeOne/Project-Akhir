const { DataTypes } = require("sequelize")

const Product = (sequelize) => {
    return sequelize.define(
    "Product", {
        product_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        default_amount:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        default_type:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true
    })
}

module.exports = Product