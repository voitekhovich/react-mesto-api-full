const jwt = require('jsonwebtoken');
const { AuthorisationError } = require('../utils/errors/AuthorisationError');

const { DEV_JWT_SECRET } = require('../utils/constans');

const { JWT_SECRET = DEV_JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new AuthorisationError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthorisationError('Некорректный токен'));
  }
  req.user = payload;
  return next();
};
