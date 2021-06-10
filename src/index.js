require('dotenv').config();
const routes = require('./app/routes');
const app = require('./config/server');

const PORT = process.env.PORT || 3000;

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
