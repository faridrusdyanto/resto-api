'use strict';

exports.ok = (res, status, message, values) => {
  const data = {
    'success': status,
    'message': message,
    'data': values,
  }

   res.json(data);
   res.end();
}
