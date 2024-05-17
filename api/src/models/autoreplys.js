const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    return sequelize.define("autoreplys", {
        exacttri: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        trigger: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        reply: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
};
