var mysql = require('mysql');

// buat koneksi database
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '@135790eL',
  database: 'db_resto'
});
conn.connect(function (err) {
  if (err) {
    console.error('error connecting : ' + err.stack);
    return;
  }

  console.log('connected as id ' + conn.threadId);
});
 
module.exports = conn;
