// ! Jangan lupa buat env.example
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');

const Controller = require('./controllers/controller');
const JikanController = require('./controllers/jikanController');
const OpenaiController = require('./controllers/openaiController');
const errorHandler = require('./middlewares/errorHandler');
const AuthController = require('./controllers/authController');
const authentication = require('./middlewares/authentication');
const SubscribeController = require('./controllers/subscribeController');
const { authorizationSubscribe } = require('./middlewares/authorization');

// Multer
const multer = require('multer');
const storage = multer.memoryStorage();
// langkah pertama multer
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', Controller.home);

// ! Open AI
// ! Midtrans
// ! Testing
// ! Hosting
// !// Dokumentasi API
// !// Login via google

app.post('/register', AuthController.register);
app.post('/login', AuthController.login);
app.post("/google-login", AuthController.loginGoogle)


app.use(authentication);
app.post("/open-ai", OpenaiController.postEmotion)


app.get('/anime-list', JikanController.getAnime);
app.get('/anime-list/characters', JikanController.getAnimeCharacters);
app.get('/anime-list/:id', JikanController.getAnimeById);
app.get('/anime-list/:id/character', JikanController.getAnimeCharacterById);
app.get('/anime-list/:id/statistics', JikanController.getAnimeStatistics);

app.get('/profile', AuthController.getUser);
app.put('/profile', upload.single('imageUrl'), AuthController.putUser);

app.get('/subscribe', SubscribeController.getSubscribe);
app.post('/subscribe', SubscribeController.postSubscribe);
app.patch(
  '/subscribe/:SubscribeId',
  authorizationSubscribe,
  SubscribeController.updateSubscribe
);
app.delete(
  '/subscribe/:SubscribeId',
  authorizationSubscribe,
  SubscribeController.deleteSubscribe
);
app.patch(
  '/subscribe/:SubscribeId/up-vote',
  authorizationSubscribe,
  SubscribeController.updateSubscribeUpVote
);
app.patch(
  '/subscribe/:SubscribeId/neutral-vote',
  authorizationSubscribe,
  SubscribeController.updateSubscribeNeutralVote
);
app.patch(
  '/subscribe/:SubscribeId/down-vote',
  authorizationSubscribe,
  SubscribeController.updateSubscribeDownVote
);

app.use(errorHandler);

module.exports = app;
