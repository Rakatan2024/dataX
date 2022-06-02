const express = require('express');
const route = express.Router()
const services = require('../services/srender');
const starcontr = require("../controller/starcontr");

route.get('/', services.shomeRoutes);


route.get('/add-star', services.add_star)

route.get('/update-star', services.update_star)

route.post('/api/stars', starcontr.create);
route.get('/api/stars', starcontr.find);
route.put('/api/stars/:id', starcontr.update);
route.delete('/api/stars/:id', starcontr.delete);

module.exports = route