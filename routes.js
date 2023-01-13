'use strict';

module.exports = function(app) {
  var jsonku = require('./controller');

  app.route('/')
    .get(jsonku.index);

  app.route('/data-user')
    .get(jsonku.getDataUser);

  app.route('/add-user')
    .post(jsonku.addUser);
}

