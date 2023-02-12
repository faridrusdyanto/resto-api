'use strict';
const response = require('../config/res');
const categoryModel = require('../model/categoryModel');

const methodPost = async (req, res) => {
  try {
    const { category_name } = req.body;
    const store = new categoryModel({
      category_name
    })
    await store.save();
    response.ok(res, true, "Category berhasil ditambahkan", 201);
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

module.exports = {
  methodPost,
  methodGet,
  methodGetId,
  methodDelete,
  methodUpdate
}
