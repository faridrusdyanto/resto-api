const sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// buat koneksi database
const db = new sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME, 
  dialect: process.env.DB_DIALECT
});
db.sync({force:false})
 
module.exports = db;
