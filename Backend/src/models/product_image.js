const { DataTypes } = require("sequelize")

const ProductImage = (sequelize) => {
    return sequelize.define(
    "ProductImage", {
        img_url:{
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        paranoid: true
    })
}

module.exports = ProductImage