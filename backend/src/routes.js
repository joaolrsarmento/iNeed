const express = require('express');

// Controllers
const PersonController = require('./controllers/PersonController');
const LoginController = require('./controllers/LoginController');

const routes = express.Router();


/** Person's methods:
 * get -> complete list of the users
 * post -> create a new user (sign up)
 * delete -> delete a user (delete account)
 */

routes.get('/persons', PersonController.index);
routes.post('/persons', PersonController.create);
routes.delete('/persons/:username', PersonController.delete);

/** Login's method:
 * post -> try to login
 */
routes.post('/login', LoginController.create);


module.exports = routes;