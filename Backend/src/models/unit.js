const { DataTypes } = require("sequelize")

const Unit = (sequelize) => {
    return sequelize.define(
    "Unit", {
        unit_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        paranoid: true
    })
}

module.exports = Unit