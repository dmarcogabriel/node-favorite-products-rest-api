const server = require('./server');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

(async () => {
  await sequelize.connect();
  server.listen(PORT, () => {
  // eslint-disable-next-line no-console
    console.log(`Server running at http://localhost:${PORT}`);
  });
})();
