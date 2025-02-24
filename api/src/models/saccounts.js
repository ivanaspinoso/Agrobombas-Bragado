const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('saccounts', {
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
        cpra_asoc: {
            type: DataTypes.INTEGER,
        },
        prov_asoc: {
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