const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('buy', {
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cellphone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        notesupplier: {
            type: DataTypes.STRING,
            allowNull: true
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ordercart: {
            type: DataTypes.STRING,
            allowNull: true
        },
        noteadmin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ipbuy: {
            type: DataTypes.STRING,
            allowNull: true
        },
        paga: {
            type: DataTypes.FLOAT,
        },
        resta: {
            type: DataTypes.FLOAT,
        },
        invoice: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}