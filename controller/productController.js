'use strict';
const response = require('../config/res');
const productModel = require('../model/productModel');
const db = require('../config/connection');
const { QueryTypes } = require('sequelize');

const dataProductAndCategory = async (req, res) => {
  try {
    const getData = await db.query(
      "SELECT `a`.`id`, `a`.`product_name`, `a`.`product_desc`, `a`.`price`, `a`.`image`, `b`.`category_name` " + 
      "FROM  `product` `a` LEFT JOIN `category` `b` ON `b`.`id` = `a`.`id_category` WHERE `a`.`is_delete` = 0 AND  `a`.`available` = 1", 
      {
        type: QueryTypes.SELECT 
      });
    response.ok(res, true, "Data tersedia", 200, getData)
  } catch (err) {
    console.error(err);
  }
}

const methodGet = async (req, res) => {
  try {
    const getData = await productModel.findAll({
      where: {
        is_delete: 0
      }
    });
    response.ok(res, true, "Data tersedia", 200, getData)
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", 400, err)
  }
}

const methodPost = async (req, res) => {
  try {
    const { product_name, product_desc, price, image, available, id_category } = req.body;
    const store = new productModel({
        product_name, product_desc, price, image, available, id_category
    })
    await store.save();
    response.ok(res, true, "Produk berhasil ditambahkan", 201);
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", 400, err)
  }
}

// const methodGetId = async (req, res) => {
//   try {
//     const id = req.params.id
//     const getData = await productModel.findOne({
//       where: { id: id }
//     });
//     if (getData) {
//       response.ok(res, true, "Data tersedia", 200, getData)
//     } else {
//       response.ok(res, false, "Data tidak tersedia", 404, getData)
//     }
//   } catch (err) {
//     console.error(err)
//     response.ok(res, false, "error", 400, err)
//   }
// }

// const methodDelete = async (req, res) => {
//   try {
//     const { id } = req.body;

//     const deleteCategory = productModel.update({
//       is_delete: 1
//     }, {
//       where: { id: id }
//     })
//     await deleteCategory;
//     response.ok(res, true, "Category berhasil dihapus", 200);
//   } catch (err) {
//     console.error(err)
//     response.ok(res, false, "error", 400, err)
//   }
// }
// const methodUpdate = async (req, res) => {
//   try {
//     const { id, category_name } = req.body;

//     const updateCategory = productModel.update({
//       category_name
//     }, {
//       where: { id }
//     })
//     await updateCategory;
//     response.ok(res, true, "Category berhasil diupdate", 200);
//   } catch (err) {
//     console.error(err)
//     response.ok(res, false, "error", 400, err)
//   }
// }

module.exports = {
  methodPost,
  dataProductAndCategory,
  methodGet
//   methodGetId,
//   methodDelete,
//   methodUpdate
}
