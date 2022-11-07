const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { celebrate } = require('celebrate');

const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../utils/errors/NotFoundError');

const { loginSсhema } = require('../utils/joiSchemas');

router.post('/signin', celebrate(loginSсhema), login);
router.post('/signup', celebrate(loginSсhema), createUser);

router.use(cookieParser());
router.use(auth);

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use('*', () => {
  throw new NotFoundError('Был запрошен несуществующий роут');
});

module.exports = router;
