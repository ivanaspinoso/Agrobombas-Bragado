const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("orderline", {
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price: {
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
