const router = require("express").Router()

const AuthController = require("../controllers/authController");
const Controller = require("../controllers/controller");
const PaymentController = require("../controllers/paymentController")
const authentication = require('../middlewares/authentication');
// const { authorizationSubscribe } = require('../middlewares/authorization');
const errorHandler = require('../middlewares/errorHandler');
const routerOpenai = require("./openai")
const routerAnime = require("./anime")
const routerProfile = require("./profile")
const routerSubscribe = require("./subscribe")

// ! Testing
// ! Hosting

router.get('/', Controller.home);

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/google-login', AuthController.loginGoogle);

router.use(authentication);

router.patch("/user/me/upgrade", AuthController.upgradeAccount)

router.get("/payment/midtrans", PaymentController.initiateMidtrans)

router.use("/open-ai", routerOpenai)

router.use("/anime-list", routerAnime)

router.use("/profile", routerProfile)

router.use("/subscribe", routerSubscribe)

router.use(errorHandler);

module.exports = router;