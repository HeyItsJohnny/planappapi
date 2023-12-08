const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const activityRoutes = require('./api/routes/getActivities');

//Middleware
app.use('/products', productRoutes);
app.use('/getActivities', activityRoutes);

module.exports = app;