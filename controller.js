'use strict';

var response = require('./res');
var connection = require('./connection');
var passwordHash = require('password-hash');

exports.index = function(req, res) {
  response.ok('Aplikasi REST API Berjalan', res)
}

// get all data user
exports.getDataUser = function(req, res) {
  connection.query("SELECT * FROM user", function(error, rows, fileds) {
    if(error) {
      console.log(error);
    } else {
      response.ok(rows, res)
    }
  });
}

// add user
exports.addUser = function(req, res) {
  var post = {
    username: req.body.username,
    password: passwordHash.generate(req.body.password)
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
                response.ok("Berhasil menambahkan data user baru", res);
            }
        });
      } else {
          response.ok("User sudah terdaftar!", res);
      }
    }
  })
}

