const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

const authentication = async (req, res, next) => {
  try {
    const access_token = req.headers.authorization
    if (!access_token) throw {name: "Unauthenticated"}

    const [type, token] = access_token.split(" ")
    if (type !== "Bearer") throw {name: "Unauthenticated"}

    const payload = verifyToken(token)

    const user = await User.findByPk(payload.id)
    if(!user) throw {name: "Unauthenticated"}

    req.user = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      subscription: user.subscription
    };
    next();

  } catch (error) {
    next(error)
  }
}

module.exports = authentication;