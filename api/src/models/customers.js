const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('customer', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
        },
        postal_code: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,          
        },
        phone: {
            type: DataTypes.STRING,
        },
        cuit: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        web: {
            type: DataTypes.STRING,
        }
    })
}