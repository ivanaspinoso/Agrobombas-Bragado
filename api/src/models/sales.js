const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('sale', {
        client: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cellphone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        noteclient: {
            type: DataTypes.STRING,
            allowNull: true
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ordercart: {
            type: DataTypes.STRING,
            allowNull: true
        },
        noteadmin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        iporder: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}