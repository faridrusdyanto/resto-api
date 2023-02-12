const response = require('../config/res');
const userController = require('../controller/userController')
const accessTokenModel = require('../model/accessTokenModel');
const jwt = require('jsonwebtoken');
const ip = require('ip');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config()

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkUser = await userController.checkUsername(username);
    if (checkUser) {
      const id_userDB = checkUser.id;
      const usernameDB = checkUser.username;
      const passwordDB = checkUser.password;
      const roleDB = checkUser.role;
      const checkPassword = await bcrypt.compare(password, passwordDB);
      if (checkPassword) {
        const token = jwt.sign({ id_user: id_userDB, username: usernameDB, role: roleDB }, process.env.SECRET_TOKENS, {
          expiresIn: 28800
        });
        const store = new accessTokenModel({
          token, ip_address: ip.address(), id_user: id_userDB
        })
        const insertToken = await store.save();
        if (insertToken) {
          const data = {
            id_user: id_userDB,
            user: usernameDB,
            role: roleDB,
            token: token
          }
          response.ok(res, true, "Berhasil login", 200, data);
        } else {
          response.ok(res, false, "Gagal generate token", 400)
        }
      } else {
        response.ok(res, false, "Username atau password salah", 404)
      }
    } else {
      response.ok(res, false, "Username atau password salah", 404)
    }
  } catch (err) {
    console.error(err);
    response.ok(res, false, 'error', 400, err)
  }
}

module.exports = {
  login
}