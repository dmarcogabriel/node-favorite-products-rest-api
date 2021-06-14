require('dotenv').config();
const { sequelize } = require('./app/models');

exports.connect = async () => {
  try {
    console.log('Database connecting...');
    await sequelize.sync({ force: true });
    console.log('Database connected!!');
  } catch (error) {
    console.log('deu ruim aqui', error.message);
  }
};

exports.disconnect = async () => {
  await sequelize.close();
};
