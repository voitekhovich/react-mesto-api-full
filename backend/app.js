require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const errs = require('./middlewares/errs');
const { limiter } = require('./utils/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { cors } = require('./middlewares/cors');

const { PORT = 3000, MONGO_DB_URL = 'mongodb://localhost:27017/mestodb2' } = process.env;
const app = express();

mongoose.connect(MONGO_DB_URL);

app.use(cors);

app.use(limiter);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(require('./routes'));

app.use(errorLogger);

app.use(errors());
app.use(errs);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
