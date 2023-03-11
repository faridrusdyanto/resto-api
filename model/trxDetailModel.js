const sequelize = require('sequelize');
const db = require('../config/connection');
const productModel = require('./productModel');
const trxModel = require('./trxModel');

const trxDetailModel = db.define(
  "TrxDetail",
  {
    id: {
      type: sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    qty: { 
      type: sequelize.INTEGER(10),
      allowNull: false
    },
    is_delete: { 
      type: sequelize.TINYINT(1),
      allowNull: false,
      defaultValue: 0
    },
  },
  {
    tableName: "trx_detail"
  }
);

productModel.hasOne(trxDetailModel, {
  foreignKey: { name: 'id_product', allowNull: false }
});

trxModel.hasMany(trxDetailModel, {
  foreignKey: { name: 'id_trx', allowNull: false }
});

module.exports = trxDetailModel;