const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("orderline", {
    article: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    image:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    ordercart: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
