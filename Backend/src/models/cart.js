const { DataTypes } = require("sequelize")

const Cart = (sequelize) => {
    return sequelize.define(
    "Cart", {
        qty:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_price:{
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        paranoid: true
    })
}

module.exports = Cart