const sequelize = require('sequelize');
const db = require('../config/connection');

const userModel = db.define(
  "User",
  {
    id: {
      type: sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: { 
      type: sequelize.STRING(50),
      allowNull: false
    },
    password: { 
      type: sequelize.TEXT,
      allowNull: false
    },
    role: { 
      type: sequelize.STRING(50),
      allowNull: false,
    },
    is_delete: { 
      type: sequelize.TINYINT(1),
      allowNull: false,
      defaultValue: 0
    },
  },
  {
    tableName: "users"
  }
);

module.exports = userModel;