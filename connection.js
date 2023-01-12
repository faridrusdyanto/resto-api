var mysql = require('mysql');

// buat koneksi database
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'db_resto'
});

conn.connect((err) => {
  if(err) throw err;
  console.log('Mysql terkoneksi');
});

module.exports = conn;
