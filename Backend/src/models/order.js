const { DataTypes } = require("sequelize")

const Order = (sequelize) => {
    return sequelize.define(
    "Order", {
        invoice:{
            type: DataTypes.STRING,
            allowNull: false
        },
        shipping_method:{
            type: DataTypes.STRING,
            allowNull: false
        },
        shipping_price:{
            type: DataTypes.STRING,
            allowNull: false
        },
        transaction_total:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true
    })
}

module.exports = Order