const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    return sequelize.define("receipts", {
        text: {
            type: DataTypes.TEXT('large'),
            allowNull: false,
        },
        numwa: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}