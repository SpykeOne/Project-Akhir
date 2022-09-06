const { DataTypes } = require ("sequelize")

const address = (sequelize) => {
    return sequelize.define(
        "Address",
        {
            address_detail: {
                type: DataTypes.STRING,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            province: {
                type: DataTypes.STRING,
                allowNull: false
            },
            post_code: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        }, {
            paranoid: true
        })
}

module.exports = address