const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("messages", {
    text: {
      type: DataTypes.TEXT('large'),
      allowNull: false,
    },
    inmediate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },  
    senddate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    sendtime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    sended: {
      type: DataTypes.BOOLEAN,
      allowNull: false,    
    },
    sendeddate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    sendedtime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  });
};
