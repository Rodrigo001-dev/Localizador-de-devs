const { Router } = require('express');

const DevController = require('./controllers/DevControllers');
const SearchController = require('./controllers/SearchController')

const Routes = Router();

Routes.get('/devs', DevController.index)
Routes.post('/devs', DevController.store);

Routes.get('/search', SearchController.index);

 module.exports = Routes; // Está exportando o objato Routes dentro do response
