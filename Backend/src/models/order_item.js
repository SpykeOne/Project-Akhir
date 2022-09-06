const { DataTypes } = require("sequelize")

const OrderItem = (sequelize) => {
    return sequelize.define(
    "OrderItem", {
        qty:{
            type: DataTypes.INTEGER,
        },
        price:{
            type: DataTypes.STRING
        }
    }, {
        paranoid: true
    })
}

module.exports = OrderItem