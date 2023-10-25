const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = { customCssUrl: '/swagger-ui.css' };
const routes = require('./src/routes');
require('dotenv').config();


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


if (process.env.NODE_ENV !== 'test') {
  const swaggerDocument = require('./swagger/swagger_output.json');
  app.get('/', (req, res) => {/* #swagger.ignore = true */ res.redirect('/doc'); });
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
}

routes(app);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;