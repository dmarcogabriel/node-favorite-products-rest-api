require('dotenv').config();
const database = require('./config/database');

beforeAll(async () => {
  await database.connect();
});

afterAll(async () => {
  await database.disconnect();
});
