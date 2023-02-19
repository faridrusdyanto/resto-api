const sequelize = require('sequelize');
const db = require('../config/connection');
// const productModel = require('./productModel');

const categoryModel = db.define(
  "Category",
  {
    id: {
      type: sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    category_name: { 
      type: sequelize.STRING(50),
      allowNull: false
    },
    is_delete: { 
      type: sequelize.TINYINT(1),
      allowNull: false,
      defaultValue: 0
    },
  },
  {
    tableName: "category"
  }
);

module.exports = categoryModel;