const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false,
});

const connect = async () => {
  console.log('Connecting to database...');
  await sequelize.sync({ force: true });
  console.log('Database connected!');
};

const disconnect = async () => {
  await sequelize.close();
};

module.exports = { connect, sequelize, disconnect };
