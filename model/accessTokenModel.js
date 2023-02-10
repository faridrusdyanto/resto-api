const sequelize = require('sequelize');
const db = require('../config/connection');
const userModel = require('./userModel');

const accessTokenModel = db.define(
  "AccessToken",
  {
    id: {
      type: sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    token: { 
      type: sequelize.TEXT,
      allowNull: false
    },
    ip_address: { 
      type: sequelize.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "access_token"
  }
);

userModel.hasOne(accessTokenModel, {
  foreignKey: {name: 'id_user', allowNull: false }
});

module.exports = accessTokenModel;