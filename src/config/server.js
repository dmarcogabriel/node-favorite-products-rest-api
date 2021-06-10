require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');

const app = express();

app.use(express.json());
app.use(cors());
sequelize.sync({ force: true });

module.exports = app;
