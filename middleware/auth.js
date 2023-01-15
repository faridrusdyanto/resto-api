var connection = require('../connection');
var mySql = require('mysql');
var response = require('../res');
var jwt = require('jsonwebtoken');
var ip = require('ip');
var bcrypt = require('bcrypt');
var config = require('../config/secret');

exports.login = function(req, res) {
  var post = {
    username: req.body.username,
    password: req.body.password
  }
  
  var query = "SELECT * FROM ?? WHERE ??=?";
  var table = ["user", "username", post.username];

  query = mySql.format(query, table);
  connection.query(query, function(error, rows) {
    if(error) {
        console.log(error);
    } else {
      if(rows.length == 1) {
        id_user = rows[0].id;
        username = rows[0].username;
        role = rows[0].role;
        
        bcrypt.compare(post.password, rows[0].password, function(err, result) {
          if (result) {
            var token = jwt.sign({rows}, config.secret, {
              expiresIn: 28800
            });
            
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
                  success: true,
                  message: 'Login Berhasil!',
                  data: {
                    id_user: data.id_user,
                    user: username,
                    role: role,
                    token: token
                  },
                });
              }
            });
          } else {
            res.json({"success": false, "message": "Password salah!"});
          }
        })
      } else {
         res.json({"success": false, "message": "Username tidak terdaftar!"});
      }
    }
  })
}
