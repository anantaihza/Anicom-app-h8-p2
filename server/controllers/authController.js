const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');

class AuthController {
  static async register(req, res, next) {
    try {
      const { fullName, email, password } = req.body;
      const user = await User.create({
        fullName,
        email,
        password,
      });

      res.status(201).json({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        throw { name: 'BadRequest', message: 'Email / Password is required' };

      const findUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!findUser) throw { name: 'Unauthorized' };

      const comparePass = comparePassword(password, findUser.password);
      if (!comparePass) throw { name: 'Unauthorized' };

      const access_token = signToken({
        id: findUser.id,
      });

      res.status(200).json({ name: findUser.fullName, access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
