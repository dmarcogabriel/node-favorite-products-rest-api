require('dotenv').config();
// const path = require('path');
const express = require('express');
const cors = require('cors');
// const { sequelize } = require('./config/database');
const routes = require('./app/routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
