const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('caccounts', {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        income: {
            type: DataTypes.FLOAT,
        },
        outflow: {
            type: DataTypes.FLOAT,
        },
        vta_asoc: {
            type: DataTypes.INTEGER,
        },
        client_asoc: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        note: {
            type: DataTypes.STRING,
        },
        user_asoc: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}