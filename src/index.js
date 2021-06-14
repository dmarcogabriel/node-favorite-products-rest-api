const app = require('./server');
const db = require('./db');

const PORT = process.env.PORT || 3000;

(async () => {
  await db.connect();
  app.listen(PORT, () => {
  // eslint-disable-next-line no-console
    console.log(`Server running at http://localhost:${PORT}`);
  });
})();
