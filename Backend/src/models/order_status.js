const { DataTypes } = require("sequelize")

const OrderStatus = (sequelize) => {
    return sequelize.define(
    "OrderStatus", {
        status:{
            type: DataTypes.STRING,
        },
    }, {
        paranoid: true
    })
}

module.exports = OrderStatus