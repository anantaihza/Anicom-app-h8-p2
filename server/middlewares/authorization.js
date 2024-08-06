const { Subscribe } = require('../models');

const authorizationSubscribe = async (req, res, next) => {
  try {
    const { SubscribeId } = req.params;

    const subscribe = await Subscribe.findByPk(SubscribeId);
    // console.log(subscribe)
    if (!subscribe) throw { name: 'NotFound' };

    if (req.user.id !== subscribe.UserId) throw { name: 'Forbidden' };

    req.subscribe = {
      watched: subscribe.watched,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authorizationSubscribe,
};
