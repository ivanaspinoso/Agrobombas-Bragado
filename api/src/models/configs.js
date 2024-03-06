const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("configs", {
    business: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slogan: {
      type: DataTypes.STRING,
    },
    messagewauno: {
      type: DataTypes.TEXT,
    },
    messagewados: {
      type: DataTypes.TEXT,
    },
    messagewatres: {
      type: DataTypes.TEXT,
    },
    messagewacuatro: {
      type: DataTypes.TEXT,
    },
    horario: {
      type: DataTypes.TEXT,
    },
    deliveryprice: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    }
  });
};
