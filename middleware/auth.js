const connection = require('../config/connection');
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
        const token = jwt.sign({ id_userDB, usernameDB, roleDB }, process.env.SECRET_TOKENS, {
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
          response.ok(res, true, "Berhasil login", data);
        } else {
          response.ok(res, false, "Gagal generate token")
        }
      } else {
        response.ok(res, false, "Username atau password salah")
      }
    } else {
      response.ok(res, false, "Username atau password salah")
    }
  } catch (err) {
    console.error(err);
    response.ok(res, false, 'error', err)
  }
}

// exports.loginLama = (req, res) => {
//   const post = {
//     username: req.body.username,
//     password: req.body.password
//   }
  
//   let query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
//   const table = ["user", "username", post.username, "is_delete", 0];

//   query = mySql.format(query, table);
//   connection.query(query, (error, rows) => {
//     if(error) {
//         console.log(error);
//     } else {
//       if(rows.length == 1) {
//         id_user = rows[0].id;
//         username = rows[0].username;
//         role = rows[0].role;
        
//         bcrypt.compare(post.password, rows[0].password, (err, result) => {
//           if (result) {
//             const token = jwt.sign({rows}, process.env.SECRET_TOKENS, {
//               expiresIn: 28800
//             });
            
//             const data = {
//               id_user: id_user,
//               token: token,
//               ip_address: ip.address()
//             }
    
//             let query = "INSERT INTO ?? SET ?";
//             const table = ["access_token"];
    
//             query = mySql.format(query, table);
//             connection.query(query, data, (error, rows) => {
//               if(error) {
//                 console.log(error);
//               } else {
//                 res.json({
//                   success: true,
//                   message: 'Login Berhasil!',
//                   data: {
//                     id_user: data.id_user,
//                     user: username,
//                     role: role,
//                     token: token
//                   },
//                 });
//               }
//             });
//           } else {
//             res.json({"success": false, "message": "Password salah!"});
//           }
//         })
//       } else {
//          res.json({"success": false, "message": "Username tidak terdaftar!"});
//       }
//     }
//   })
// }

module.exports = {
  login
}