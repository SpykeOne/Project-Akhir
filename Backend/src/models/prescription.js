const { DataTypes } = require("sequelize")

const Prescription = (sequelize) => {
    return sequelize.define(
    "Prescription", {
        image:{
            type: DataTypes.STRING,
        },
    }, {
        paranoid: true
    })
}

module.exports = Prescription