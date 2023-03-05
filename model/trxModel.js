const sequelize = require('sequelize');
const db = require('../config/connection');
const userModel = require('./userModel');

const trxModel = db.define(
  "Trx",
  {
    id: {
      type: sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    trx_number: { 
      type: sequelize.STRING(50),
      allowNull: false
    },
    customer_name: { 
      type: sequelize.STRING(50),
      allowNull: false
    },
    seat: { 
      type: sequelize.STRING(50),
      allowNull: false
    },
    payment: { 
      type: sequelize.BIGINT,
      allowNull: false
    },
    note: { 
      type: sequelize.TEXT,
      allowNull: true
    },
    is_buy: { 
      type: sequelize.TINYINT(1),
      allowNull: false,
      defaultValue: 0
    },
  },
  {
    tableName: "trx"
  }
);

userModel.hasOne(trxModel, {
  foreignKey: { name: 'id_kasir', allowNull: true }
});

module.exports = trxModel;