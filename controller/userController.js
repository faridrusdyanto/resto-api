'use strict';
const response = require('../config/res');
const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const saltRounds = 10;

const checkUsername = async (username) => {
  try {
    const getData = await userModel.findOne({
      where: {
        is_delete: 0,
        username: username
      }
    });
    return getData
  } catch (err) {
    console.error(err)
  }
}

const methodPost = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const check = await checkUsername(username);
    if (check) {
      response.ok(res, false, "User sudah terdaftar!", 409);
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        const store = new userModel({
          username, password: hash, role
        })
        await store.save();
        response.ok(res, true, "User berhasil ditambahkan", 201);
      });
    }
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", 400, err)
  }
}

const methodGet = async (req, res) => {
  try {
    const getData = await userModel.findAll({
      attributes: ['id', 'username', 'role', 'createdAt', 'updatedAt'],
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
    const getData = await userModel.findOne({
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

    const deleteUser = userModel.update({
      is_delete: 1
    }, {
      where: { id: id }
    })
    await deleteUser;
    response.ok(res, true, "User berhasil dihapus", 200);
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", 400, err)
  }
}

const checkDataById = async (id, password) => {
  try {
    const getData = await userModel.findOne({
      where: {
        id: id,
        is_delete: 0
      }
    });
    return getData
  } catch (err) {
    console.error(err)
  }
}

const changePassword = async (req, res) => {
  try {
    const { id, oldPassword, newPassword } = req.body;
    const check = await checkDataById(id, oldPassword);
    if (check) {
      const passwordDB = check.password
      const checked = await bcrypt.compare(oldPassword, passwordDB);
      if (checked) {
        bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
          const updatePassword = userModel.update({
            password: hash
          }, {
            where: { id: id }
          })
          await updatePassword;
          response.ok(res, true, "Password berhasil diupdate", 200);
        });
      } else {
        response.ok(res, false, "Password lama tidak sesuai!", 400);
      }
    } else {
      response.ok(res, false, "User tidak terdaftar!", 404);
    }
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", 400, err)
  }
}

const index = async (req, res) => {
  try {
    const role = req.auth.role;
    await response.ok(res, true, `Anda Login Sebagai Role ${role}`, 200)
  } catch (err) {
    console.error(err)
    response.ok(res, false, 'error', 400, err)
  }
}

module.exports = {
  methodPost,
  methodGet,
  methodGetId,
  methodDelete,
  changePassword,
  checkUsername,
  index
}


