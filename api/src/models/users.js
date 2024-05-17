const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    cellphone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    backwa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vinculated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    qrcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    autoreplys: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    autobots: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  });
};