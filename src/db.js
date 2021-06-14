require('dotenv').config();
const { sequelize } = require('./app/models');

exports.connect = async () => {
  console.log('Database connecting...');
  await sequelize.sync({ force: true });
  console.log('Database connected!');
};

exports.disconnect = async () => {
  console.log('Database stopping...');
  await sequelize.close();
  console.log('Database connection closed!');
};
