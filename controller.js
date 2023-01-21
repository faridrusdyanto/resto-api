'use strict';

const response = require('./res');
const connection = require('./connection');
const bcrypt = require('bcrypt');

exports.index = (req, res) => {
  response.ok(res, true, 'Aplikasi REST API Berjalan')
}

// get all data user
exports.getDataUser = (req, res) => {
  connection.query("SELECT * FROM user", (error, rows, fileds) => {
    if(error) {
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
        if(error) {
            console.log(error);
        } else {
          if(rows.length == 0) {
            let query = "INSERT INTO ?? SET ?";
            const table = ["user"];
            query = connection.format(query, table);
            connection.query(query, post, (error, rows) => {
                if(error) {
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
  connection.query("SELECT * FROM user WHERE id = ?", [id],
    (error, rows, fields) => {
      if(error) {
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
