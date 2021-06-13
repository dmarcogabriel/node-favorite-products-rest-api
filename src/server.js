require('dotenv').config();
const routes = require('./app/routes');
const app = require('./config/server');

app.use(routes);

module.exports = app;
