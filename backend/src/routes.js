const express = require('express');

// Controllers
const PersonController = require('./controllers/PersonController');


const routes = express.Router();


// request method: get
routes.get('/persons', PersonController.index);
// request method: get
routes.post('/persons', PersonController.create);
// request method: delete
routes.delete('/persons/:username', PersonController.delete);

module.exports = routes;