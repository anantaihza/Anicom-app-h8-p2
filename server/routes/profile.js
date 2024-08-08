const router = require("express").Router()
const AuthController = require("../controllers/authController");

// Multer
const multer = require('multer');
const storage = multer.memoryStorage();
// langkah pertama multer
const upload = multer({ storage: storage });


router.get('/', AuthController.getUser);
router.put('/', upload.single('imageUrl'), AuthController.putUser);

module.exports = router;