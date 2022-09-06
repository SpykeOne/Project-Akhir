const { DataTypes } = require("sequelize")

const Token = (sequelize) => {
    return sequelize.define(
    "Token", {
        token:{
            type: DataTypes.STRING,
            allowNull: false
        },
        valid_until: {
            type: DataTypes.DATE,
            allowNull: false
        },
        is_valid: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    })
}

module.exports = Token;