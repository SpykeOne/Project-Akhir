const { DataTypes } = require("sequelize")

const phoneValidation = /\d{3}-\d{3}-\d{4}/

const User = (sequelize) => {
    return sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
        },    
        phoneNum: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                validator: function(v){
                    return phoneValidation.test(v)
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dob: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profile_picture:  {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        paranoid: true
    })
}

module.exports = User;