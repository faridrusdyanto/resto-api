'use strict';

var response = require('./res');
var connection = require('./connection');
var bcrypt = require('bcrypt');

exports.index = function(req, res) {
  response.ok(res, 'Aplikasi REST API Berjalan')
}

// get all data user
exports.getDataUser = function(req, res) {
  connection.query("SELECT * FROM user", function(error, rows, fileds) {
    if(error) {
      console.log(error);
    } else {
      response.ok(res, true, "Data Tersedia", rows)
    }
  });
}

// add user
exports.addUser = function(req, res) {

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      var post = {
        username: req.body.username,
        password: hash,
        role: req.body.role
      }
      
      var query = "SELECT username FROM ?? WHERE ??=?";
      var table = ["user", "username", post.username];
    
      query = connection.format(query, table);
      
      connection.query(query, function(error, rows) {
        if(error) {
            console.log(error);
        } else {
          if(rows.length == 0) {
            var query = "INSERT INTO ?? SET ?";
            var table = ["user"];
            query = connection.format(query, table);
            connection.query(query, post, function(error, rows) {
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

