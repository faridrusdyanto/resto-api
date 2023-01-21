'use strict';
const jsonku = require('../controller');

module.exports = (app) => {

  app.route('/')
    .get(jsonku.index);

  app.route('/data-user')
    .get(jsonku.getDataUser);

  app.route('/add-user')
    .post(jsonku.addUser);

  app.route('/data-user/:id')
  .get(jsonku.getDataUserById);

  app.route('/change-password')
    .put(jsonku.changePassword);

}

