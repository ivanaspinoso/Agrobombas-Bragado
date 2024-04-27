const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    return sequelize.define("receipts", {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numwa: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    })
}