const axios = require('axios');
const { Anime, Subscribe, User, sequelize } = require('../models');

class SubscribeController {
  static async getSubscribe(req, res, next) {
    try {
      const { id } = req.user;
      const subscribes = await User.findByPk(id, {
        attributes: [],
        include: {
          model: Anime,
          as: "anime"
        }
      });

      res.status(200).json(subscribes.anime)
    } catch (error) {
      next(error);
    }
  }

  static async postSubscribe(req, res, next) {
    try {
      const { id } = req.user;
      const { mal_id } = req.body;

      const { data } = await axios({
        method: 'GET',
        url: `https://api.jikan.moe/v4/anime/${mal_id}`,
      });

      const result = await sequelize.transaction(async (t) => {
        const [anime, createdAnime] = await Anime.findOrCreate({
          where: {
            mal_id: mal_id,
          },
          defaults: {
            mal_id: mal_id,
            imageUrl: data.data.images.jpg.image_url,
            title: data.data.title,
            episodes: data.data.episodes,
            status: data.data.status,
            score: data.data.score,
            studios: data.data.studios[0].name,
            synopsis: data.data.synopsis,
          },
          transaction: t,
        });

        const [subscribe, createdSubscribe] = await Subscribe.findOrCreate({
          where: {
            UserId: id,
            AnimeId: anime.id,
          },
          defaults: {
            UserId: id,
            AnimeId: anime.id,
          },
          transaction: t,
        });

        return subscribe;
      });

      console.log(result);
      res.status(201).json({
        message: `Success to subscribe ${data.data.title}`,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateSubscribe(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  static async updateSubscribeVote(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  static async deleteSubscribe(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SubscribeController;
