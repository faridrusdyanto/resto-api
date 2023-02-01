'use strict';
const response = require('../config/res');
const connection = require('../config/connection');
const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const saltRounds = 10;

const checkUsername = async (username) => {
  try {
    const getData = await userModel.findAll({
      attributes: ['username'],
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
    if (check.length > 0) {
      response.ok(res, false, "User sudah terdaftar!");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        const store = new userModel({
          username, password: hash, role
        })
        await store.save();
        response.ok(res, true, "User berhasil ditambahkan");
      });
    }
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", err)
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
    response.ok(res, true, "Data tersedia", getData)
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", err)
  }
}

const methodGetId = async (req, res) => {
  try {
    const id = req.params.id
    const getData = await userModel.findOne({
      where: { id: id }
    });
    response.ok(res, true, "Data tersedia", getData)
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", err)
  }
}

const methodDelete = async (req, res) => {
  try {
    const { id } = req.body;

    const updateUser = userModel.update({
      id, is_delete: 1
    }, {
      where: { id: id }
    })
    await updateUser;
    response.ok(res, true, "User berhasil dihapus");
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", err)
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
          response.ok(res, true, "Password berhasil diupdate");
        });
      } else {
        response.ok(res, false, "Password lama tidak sesuai!");
      }
    } else {
      response.ok(res, false, "User tidak terdaftar!");
    }
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", err)
  }
}

module.exports = {
  methodPost,
  methodGet,
  methodGetId,
  methodDelete,
  changePassword
}


exports.index = (req, res) => {
  const role = req.auth.rows[0].role;
  response.ok(res, true, `Anda Login Sebagai Role ${role}`)
}
