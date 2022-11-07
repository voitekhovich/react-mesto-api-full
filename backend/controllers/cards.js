const mongoose = require('mongoose');
const Card = require('../models/card');
const { ForbiddenError } = require('../utils/errors/ForbiddenError');
const { IncorrectDataError } = require('../utils/errors/IncorrectDataError');
const { NotFoundError } = require('../utils/errors/NotFoundError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards.reverse()))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectDataError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.delCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Карточка с указанным _id не найдена'))
    .then((card) => {
      if (!(card.owner.toString() === req.user._id)) {
        return next(new ForbiddenError('Попытка удалить чужую карточку'));
      }

      return Card.findByIdAndRemove(req.params.cardId)
        .orFail(new NotFoundError('Карточка с указанным _id не найдена'))
        .then((deletedCard) => res.send(deletedCard))
        .catch((err) => {
          if (err instanceof mongoose.Error.CastError) {
            next(new IncorrectDataError('Некорректно указан _id карточки'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new IncorrectDataError('Некорректно указан _id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.putCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Передан несуществующий _id карточки'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new IncorrectDataError('Переданы некорректные данные для постановки/снятии лайка'));
      } else {
        next(err);
      }
    });
};

module.exports.delCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Передан несуществующий _id карточки'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new IncorrectDataError('Переданы некорректные данные для постановки/снятии лайка'));
      } else {
        next(err);
      }
    });
};
