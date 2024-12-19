const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        article: {
            type: DataTypes.STRING
        },
        exist: {
            type: DataTypes.BOOLEAN,
        },
        cost: {
            type: DataTypes.FLOAT,
        },
        percent: {
            type: DataTypes.FLOAT,
        },
        iva21: {
            type: DataTypes.FLOAT,
        },
        price: {
            type: DataTypes.FLOAT,
        },
        percent2: {
            type: DataTypes.FLOAT,
        },
        price1: {
            type: DataTypes.FLOAT,
        },
        price2: {
            type: DataTypes.FLOAT,
        },
        iva10: {
            type: DataTypes.FLOAT,
        },
        isOfert: {
            type: DataTypes.BOOLEAN
        },
        imagepid: {
            type: DataTypes.STRING,
        },
        imageurl: {
            type: DataTypes.STRING,
        },
        show: {
            type: DataTypes.BOOLEAN,
        },
        units: {
            type: DataTypes.STRING,
        },
        stockunits: {
            type: DataTypes.FLOAT,
        },
        capacity: {
            type: DataTypes.FLOAT
        },
        capacityunit: {
            type: DataTypes.STRING
        },
        minunit: {
            type: DataTypes.FLOAT,
        },
        stepunit: {
            type: DataTypes.FLOAT,
        },
        weigth: {
            type: DataTypes.FLOAT,
        },
        height: {
            type: DataTypes.FLOAT,
        },
        width: {
            type: DataTypes.FLOAT,
        },
        linkinfo: {
            type: DataTypes.STRING
        },
        prov_code: {
            type: DataTypes.INTEGER,
        },
        stock:{
            type: DataTypes.FLOAT,
        }
    })
}