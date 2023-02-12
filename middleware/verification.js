const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const response = require('../config/res');
dotenv.config();

const isAdmin = async (req, res, next) => {
  try {
    const tokenWithBearer = req.headers.authorization;
    if (tokenWithBearer) {
      const token = tokenWithBearer.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET_TOKENS);
      const getRole = decoded.role;
      if (getRole === 'administrator') {
        req.auth = decoded;
        await next();
      } else {
        await response.auth(res, false, "Gagal mengotorisasi role anda!", 403)
      }
    } else {
      await response.auth(res, false, "Token tidak tersedia!", 401)
    }
  } catch (err) {
    await response.auth(res, false, "Token tidak terdaftar!", 401)
  }
}

const isKasir = async (req, res, next) => {
  try {
    const tokenWithBearer = req.headers.authorization;
    if (tokenWithBearer) {
      const token = tokenWithBearer.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET_TOKENS);
      const getRole = decoded.role;
      if (getRole === 'kasir') {
        req.auth = decoded;
        await next();
      } else {
        await response.auth(res, false, "Gagal mengotorisasi role anda!", 403)
      }
    } else {
      await response.auth(res, false, "Token tidak tersedia!", 401)
    }
  } catch (err) {
    await response.auth(res, false, "Token tidak terdaftar!", 401)
  }
}

const isAllRole = async (req, res, next) => {
  try {
    const tokenWithBearer = req.headers.authorization;
    if (tokenWithBearer) {
      const token = tokenWithBearer.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET_TOKENS);
      const getRole = decoded.role;
      if (getRole === 'kasir' || getRole === 'administrator') {
        req.auth = decoded;
        await next();
      } else {
        await response.auth(res, false, "Gagal mengotorisasi role anda!", 403)
      }
    } else {
      await response.auth(res, false, "Token tidak tersedia!", 401)
    }
  } catch (err) {
    await response.auth(res, false, "Token tidak terdaftar!", 401)
  }
}

module.exports = {
  isAdmin, isKasir, isAllRole
};
