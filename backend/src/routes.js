const express = require('express');

// Controllers
const PersonController = require('./controllers/PersonController');
const LoginController = require('./controllers/LoginController');
const ItemToGetController = require('./controllers/ItemToGetController');
const ItemToGiveController = require('./controllers/ItemToGiveController');
const TransactionController = require('./controllers/TransactionController');
// Router
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

/** ItemsToGet's methods:
 * post -> new item to get
 * get -> list items to get
 * delete -> delete item
 */
routes.get('/getitems', ItemToGetController.index);
routes.post('/getitems', ItemToGetController.create);
routes.delete('/getitems/:id', ItemToGetController.delete);

/** ItemsToGive's methods:
 * post -> new item to get
 * get -> list items to get
 * delete -> delete item
 */
routes.get('/giveitems', ItemToGiveController.index);
routes.post('/giveitems', ItemToGiveController.create);
routes.delete('/giveitems/:id', ItemToGiveController.delete);

/** Transaction's methods:
 * post -> make a transaction
 * get -> list transactions
 */

 /** To make a transaction, you should access the api:
  * /transaction/{type of the item(get or give)}/{item_id}
  * Items to give post body: {"date": dayOfTheTransaction, "daysNeeded": daysNeeded}
  * Items to get post body: {"date": dayOfTheTransaction}
  */
routes.get('/transaction', TransactionController.index);
routes.post('/transaction/get/:id', TransactionController.transactionToGet);
routes.post('/transaction/give/:id', TransactionController.transactionToGive);

// 
module.exports = routes;