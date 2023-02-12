'use strict';

exports.ok = async (res, status, message, code, values) => {
  const data = {
    'success': status,
    'message': message,
    'data': values,
  }

  await res.status(code);
  await res.json(data);
  await res.end();
}

exports.auth = async (res, status, message, code) => {
  const data = {
    'auth': status,
    'message': message,
  }
  
  await res.status(code);
  await res.json(data);
  await res.end();
}
