'use strict';
const response = require('../config/res');
const categoryModel = require('../model/categoryModel');
const db = require('../config/connection');
const { QueryTypes } = require('sequelize');

const methodPost = async (req, res) => {
  try {
    const { category_name } = req.body;
    const getData = await categoryModel.findOne({
      where: { category_name, is_delete: 0 }
    });
    if (getData) {
      await response.ok(res, false, "Category sudah ada", 400);
    } else {
      const store = new categoryModel({
        category_name
      })
      await store.save();
      await response.ok(res, true, "Category berhasil ditambahkan", 201);
    }
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", 400, err)
  }
}

const methodGet = async (req, res) => {
  try {
    const getData = await categoryModel.findAll({
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

const methodGetId = async (req, res) => {
  try {
    const id = req.params.id
    const getData = await categoryModel.findOne({
      where: { id: id }
    });
    if (getData) {
      response.ok(res, true, "Data tersedia", 200, getData)
    } else {
      response.ok(res, false, "Data tidak tersedia", 404, getData)
    }
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", 400, err)
  }
}

const methodDelete = async (req, res) => {
  try {
    const { id } = req.body;

    const deleteCategory = categoryModel.update({
      is_delete: 1
    }, {
      where: { id: id }
    })
    await deleteCategory;
    response.ok(res, true, "Category berhasil dihapus", 200);
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", 400, err)
  }
}

const methodUpdate = async (req, res) => {
  try {
    const { id, category_name } = req.body;

    const updateCategory = categoryModel.update({
      category_name
    }, {
      where: { id }
    })
    await updateCategory;
    response.ok(res, true, "Category berhasil diupdate", 200);
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", 400, err)
  }
}

const dataCategoryAndProduct = async (req, res) => {
  try {
    const getData = await db.query(
      "SELECT `b`.`id` AS `id_product`, `b`.`product_name`, `b`.`product_desc`, " +
      "`b`.`price`, `b`.`image`, `a`.`id` AS `id_category`, `a`.`category_name` " +
      "FROM  `category` `a` LEFT JOIN `product` `b` ON `b`.`id_category` = `a`.`id` " + 
      "WHERE `a`.`is_delete` = 0 AND `b`.`available` = 1",
      {
        type: QueryTypes.SELECT
      }
    );
  
    const mappedData = getData.reduce((acc, current) => {
      const categoryIndex = acc.findIndex(item => item.id_category === current.id_category);
  
      if (categoryIndex !== -1) {
        acc[categoryIndex].product.push({
          id_product: current.id_product,
          product_name: current.product_name,
          product_desc: current.product_desc,
          price: current.price,
          image: current.image
        });
      } else {
        acc.push({
          id_category: current.id_category,
          category_name: current.category_name,
          product: [
            {
              id_product: current.id_product,
              product_name: current.product_name,
              product_desc: current.product_desc,
              price: current.price,
              image: current.image
            }
          ]
        });
      }
  
      return acc;
    }, []);
  
    // console.log(mappedData);
    response.ok(res, true, "Data tersedia", 200, mappedData)
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  methodPost,
  methodGet,
  methodGetId,
  methodDelete,
  methodUpdate,
  dataCategoryAndProduct
}
