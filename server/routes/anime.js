const JikanController = require("../controllers/jikanController");

const router = require("express").Router()

router.get('/', JikanController.getAnime);
router.get('/characters', JikanController.getAnimeCharacters);
router.get('/:id', JikanController.getAnimeById);
router.get('/:id/characters', JikanController.getAnimeCharacterById);
router.get('/:id/statistics', JikanController.getAnimeStatistics);

module.exports = router;