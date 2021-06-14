require('dotenv').config();
const db = require('./db');

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.disconnect();
});
