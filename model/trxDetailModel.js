const sequelize = require('sequelize');
const db = require('../config/connection');
const productModel = require('./productModel');

const trxDetailModel = db.define(
  "TrxDetail",
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

module.exports = trxDetailModel;