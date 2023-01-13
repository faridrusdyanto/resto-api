var connection = require('../connection');
var mySql = require('mysql');
var response = require('../res');
var jwt = require('jsonwebtoken');
var ip = require('ip');
var passwordHash = require('password-hash');
var config = require('../config/secret');

exports.login = function(req, res) {
  var post = {
    username: req.body.username,
    password: req.body.password
  }
  
  var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
  var table = ["user", "username", post.username, "password", passwordHash.verify(post.password)];

  query = mySql.format(query, table);
  connection.query(query, function(error, rows) {
    if(error) {
        console.log(error);
    } else {
      if(rows.length == 1) {
        var token = jwt.sign({rows}, config.secret, {
          expiresIn: 28800
        });
        id_user = rows[0].id;
        username = rows[0].username;

        var data = {
          id_user: id_user,
          token: token,
          ip_address: ip.address()
        }

        var query = "INSERT INTO ?? SET ?";
        var table = ["access_token"];

        query = mySql.format(query, table);
        connection.query(query, data, function(error, rows) {
          if(error) {
            console.log(error);
          } else {
             res.json({
               succuss: true,
               message: 'Token JWT tergenerate!',
               token: token,
               id_user: data.id_user,
               user: username
             });
          }
        });
      } else {
         res.json({"Error": true, "Message": "Username atau Passwordnya Salah!"});
      }
    }
  })
}
