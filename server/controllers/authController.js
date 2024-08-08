const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');
const cloudinary = require('cloudinary').v2;
const { OAuth2Client } = require('google-auth-library');

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

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginGoogle(req, res, next) {
    const token = req.headers.google_token;
    try {
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience:
          '1089656286519-qoanr3dtsbo186lc053agt49c83cvret.apps.googleusercontent.com', // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      // console.log(payload);
      // res.json(payload)

      const fullName = payload.name;
      const email = payload.email;
      const imageUrl = payload.picture;

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          fullName,
          email,
          password: 'GoogleLogin',
          imageUrl,
        },
        hooks: false,
      });

      if (!created) {
        if (user.password !== 'GoogleLogin') {
          throw { name: 'AlreadyRegisteredNonGoogle' };
        }
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      next(error);
    }
  }

  static async putUser(req, res, next) {
    try {
      const { id } = req.user;
      const { fullName } = req.body;

      let option = {
        fullName: fullName,
      };

      if (req.file) {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        const b64File = Buffer.from(req.file.buffer).toString('base64');

        const dataURI = `data:${req.file.mimetype};base64,${b64File}`;

        const uploadFile = await cloudinary.uploader.upload(dataURI, {
          folder: 'Phase2-IndividualProject-img',
          // public_id: req.file.originalname
        });
        
        option = { ...option, imageUrl: uploadFile.secure_url };
      }

      await User.update(option, {
        where: {
          id,
        },
      });

      res.status(200).json({
        message: 'Success to update Profile',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
