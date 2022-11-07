const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getCards, createCard, delCardById, putCardLike, delCardLike,
} = require('../controllers/cards');
const { cardSсhema, cardIdSсhema } = require('../utils/joiSchemas');

router.get('/', getCards);
router.post('/', celebrate(cardSсhema), createCard);
router.delete('/:cardId', celebrate(cardIdSсhema), delCardById);
router.put('/:cardId/likes', celebrate(cardIdSсhema), putCardLike);
router.delete('/:cardId/likes', celebrate(cardIdSсhema), delCardLike);

module.exports = router;
