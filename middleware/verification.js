const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const varification = () => {
  return (req, rest, next) => {
    // cek authorizzation header
    var tokenWithBearer = req.headers.authorization;

    if(tokenWithBearer) {
      var token = tokenWithBearer.split(' ')[1];
      // varification
      jwt.verify(token, process.env.SECRET_TOKENS, (err, decoded) => {
        const getRole = decoded.rows[0].role;
        if(err) {
          return rest.status(401).send({auth: false, message: "Token tidak terdaftar!"});
        } else {
          if(getRole === 'administrator') {
            req.auth = decoded;
            next();
          } else {
            return rest.status(401).send({auth: false, message: "Gagal mengotorisasi role anda!"});
          }
        }
      });
    } else {
      return rest.status(401).send({auth: false, message: "Token tidak tersedia!"});
    }
  }
}

module.exports = varification;
