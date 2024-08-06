// ! Jangan lupa buat env.example
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const Controller = require('./controllers/controller');
const JikanController = require('./controllers/jikanController');
const errorHandler = require('./middlewares/errorHandler');
const AuthController = require('./controllers/authController');
const authentication = require('./middlewares/authentication');
const SubscribeController = require('./controllers/subscribeController');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', Controller.home);

app.get('/anime-list', JikanController.getAnime);
app.get('/anime-list/characters', JikanController.getAnimeCharacters);
app.get('/anime-list/:id', JikanController.getAnimeById);
app.get('/anime-list/:id/character', JikanController.getAnimeCharacterById);
app.get('/anime-list/:id/statistics', JikanController.getAnimeStatistics);

app.post('/register', AuthController.register);
app.post('/login', AuthController.login);

app.use(authentication)
app.get("/subscribe", SubscribeController.getSubscribe)
app.post("/subscribe", SubscribeController.postSubscribe)
app.put("/subscribe/:AnimeId", SubscribeController.updateSubscribe)
app.put("/subscribe/:AnimeId/vote", SubscribeController.updateSubscribeVote)
app.delete("/subscribe/:AnimeId", SubscribeController.deleteSubscribe)

app.use(errorHandler);

module.exports = app;
