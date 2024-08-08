const OpenaiController = require("../controllers/openaiController");

const router = require("express").Router()

router.post('/', OpenaiController.postEmotion);

module.exports = router;