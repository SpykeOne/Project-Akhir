const { DataTypes } = require("sequelize")

const StockHistory = (sequelize) => {
    return sequelize.define(
    "StockHistory", {
        qty:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false
        },
        desc:{
            type: DataTypes.STRING,
        },
    }, {
        paranoid: true
    })
}

module.exports = StockHistory