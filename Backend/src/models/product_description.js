const { DataTypes } = require("sequelize")

const ProductDescription = (sequelize) => {
    return sequelize.define(
    "ProductDescription", {
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        composition:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        warning:{
            type: DataTypes.STRING,
            allowNull: false
        },
        expire:{
            type: DataTypes.DATE,
            allowNull: false
        },
    }, {
        paranoid: true
    })
}

module.exports = ProductDescription