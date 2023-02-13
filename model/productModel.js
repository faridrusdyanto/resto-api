const sequelize = require('sequelize');
const db = require('../config/connection');
const categoryModel = require('../model/categoryModel')

const productModel = db.define(
  "Product",
  {
    id: {
      type: sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    product_name: { 
      type: sequelize.STRING(100),
      allowNull: false
    },
    product_desc: { 
      type: sequelize.TEXT,
      allowNull: true
    },
    price: {
      type: sequelize.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    image: { 
      type: sequelize.TEXT('medium'),
      allowNull: true,
    },
    available: {
      type: sequelize.TINYINT(1),
      allowNull: false,
      defaultValue: 1
    },
    is_delete: { 
      type: sequelize.TINYINT(1),
      allowNull: false,
      defaultValue: 0
    },
  },
  {
    tableName: "product"
  }
);

categoryModel.hasOne(productModel, {
  foreignKey: { name: 'id_category', allowNull: false }
});

module.exports = productModel;