const openAI = require('../helpers/openai');
const axios = require('axios');

class OpenaiController {
  static async postEmotion(req, res, next) {
    try {
      const { emotion } = req.params;
      let { data } = await axios({
        method: 'GET',
        url: 'https://api.jikan.moe/v4/top/anime',
      });
      data = data.data.map((anime) => {
        return {
          mal_id: anime.mal_id,
          images: {
            jpg: {
              image_url: anime.images.jpg.image_url,
            },
          },
          score: anime.score,
          status: anime.status,
          title: anime.title,
          episodes: anime.episodes,
          genres: anime.genres,
          synopsis: anime.synopsis,
        };
      });

      // res.status(200).json({ result: data });
      let responseOpenAI = await openAI(data, emotion);
      console.log(responseOpenAI)
      res.status(200).json(JSON.parse(responseOpenAI));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OpenaiController;
