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
  }
}

module.exports = {
  methodPost,
  methodGet,
  methodGetId
}


exports.index = (req, res) => {
  const role = req.auth.rows[0].role;
  response.ok(res, true, `Anda Login Sebagai Role ${role}`)
}

// get all data user
exports.getDataUser = (req, res) => {
  const is_delete = 0;
  connection.query("SELECT * FROM user WHERE is_delete = ?", [is_delete],
    (error, rows, fileds) => {
      if (error) {
        console.log(error);
      } else {
        response.ok(res, true, "Data Tersedia", rows)
      }
    });
}

// add user
exports.addUser = (req, res) => {

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      const post = {
        username: req.body.username,
        password: hash,
        role: req.body.role
      }

      let query = "SELECT username FROM ?? WHERE ??=?";
      const table = ["user", "username", post.username];

      query = connection.format(query, table);

      connection.query(query, (error, rows) => {
        if (error) {
          console.log(error);
        } else {
          if (rows.length == 0) {
            let query = "INSERT INTO ?? SET ?";
            const table = ["user"];
            query = connection.format(query, table);
            connection.query(query, post, (error, rows) => {
              if (error) {
                console.log(error);
              } else {
                response.ok(res, true, "Berhasil menambahkan data user baru");
              }
            });
          } else {
            response.ok(res, false, "User sudah terdaftar!");
          }
        }
      })
    })
  })
}

exports.getDataUserById = (req, res) => {
  const id = req.params.id;
  const isDelete = 0;
  connection.query("SELECT * FROM user WHERE id = ? AND is_delete = ?", [id, isDelete],
    (error, rows, fields) => {
      if (error) {
        console.log(error);
      } else {
        if (!rows.length) {
          response.ok(res, false, "Data Tidak Tersedia")
        } else {
          response.ok(res, true, "Data Tersedia", rows[0]);
        }
      }
    }
  );
};

exports.changePassword = (req, res) => {
  const post = {
    id: req.body.id,
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword
  }

  let query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
  const table = ["user", "id", post.id, "is_delete", 0];

  query = connection.format(query, table);
  connection.query(query, (error, rows) => {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 1) {
        bcrypt.compare(post.oldPassword, rows[0].password, (err, result) => {
          if (result) {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(req.body.newPassword, salt, (err, hash) => {

                let query = "UPDATE ?? SET ??=? WHERE ??=?";
                const newPassword = ["user", "password", hash, "id", post.id];

                query = connection.format(query, newPassword);
                connection.query(query, (error, rows) => {
                  if (error) {
                    console.log(error);
                  } else {
                    response.ok(res, true, "Berhasil Merubah Password");
                  }
                });
              })
            })
          } else {
            response.ok(res, false, "Password Lama Tidak Sesuai");
          }
        })
      } else {
        response.ok(res, false, "User Tidak Terdaftar");
      }
    }
  })
}

exports.deleteUser = (req, res) => {
  const post = {
    id: req.body.id,
    idDelete: 1
  }

  let query = "UPDATE ?? SET ??=? WHERE ??=?";
  const isDelete = ["user", "is_delete", post.idDelete, "id", post.id];
  query = connection.format(query, isDelete);
  connection.query(query, (error, rows) => {
    if (error) {
      console.log(error);
    } else {
      if (!rows.changedRows) {
        response.ok(res, false, "Gagal Delete Data");
      } else {
        response.ok(res, true, "Berhasil Delete Data");
      }
    }
  });
}
