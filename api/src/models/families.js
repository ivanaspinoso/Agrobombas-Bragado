const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('family', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },

    })
}