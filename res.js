'use strict';

exports.ok = function(res, status, message, values) {
  var data = {
    'success': status,
    'message': message,
    'data': values,
  }

   res.json(data);
   res.end();
}
