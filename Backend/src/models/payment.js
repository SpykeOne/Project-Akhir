const { DataTypes } = require("sequelize")

const Payment = (sequelize) => {
    return sequelize.define(
    "Payment", {
        image:{
            type: DataTypes.STRING,
        },
    }, {
        paranoid: true
    })
}

module.exports = Payment