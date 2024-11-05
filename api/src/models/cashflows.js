const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('cashflow', {
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
        user_asoc: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mov_asoc: {
            type: DataTypes.INTEGER,        
        }
    })
}