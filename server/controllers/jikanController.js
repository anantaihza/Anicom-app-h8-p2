const axios = require('axios');

class JikanController {
  static async getAnime(req, res, next) {
    try {
      const { page } = req.query;
      let url = 'https://api.jikan.moe/v4/top/anime';

      if (page) {
        url += `?page=${page}`;
      }
      const { data } = await axios({
        method: 'GET',
        url,
      });

      res.status(200).json(data);
    } catch (error) {
      console.log(error.response.data);
      next(error);
    }
  }

  static async getAnimeCharacters(req, res, next) {
    try {
      const { page } = req.query;
      let url = 'https://api.jikan.moe/v4/top/characters';

      if (page) {
        url += `?page=${page}`;
      }
      const { data } = await axios({
        method: 'GET',
        url,
      });

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async getAnimeById(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        method: 'GET',
        url: `https://api.jikan.moe/v4/anime/${id}`,
      });

      res.status(200).json(data);
    } catch (error) {
      console.log(error.response.data);
      next(error);
    }
  }

  static async getAnimeCharacterById(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        method: 'GET',
        url: `https://api.jikan.moe/v4/anime/${id}/characters`,
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getAnimeStatistics(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        method: 'GET',
        url: `https://api.jikan.moe/v4/anime/${id}/statistics`,
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  
}

module.exports = JikanController;
