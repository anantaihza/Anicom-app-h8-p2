const SubscribeController = require("../controllers/subscribeController");
const { authorizationSubscribe } = require("../middlewares/authorization");

const router = require("express").Router()

router.get('/', SubscribeController.getSubscribe);
router.post('/', SubscribeController.postSubscribe);
router.patch(
  '/:SubscribeId',
  authorizationSubscribe,
  SubscribeController.updateSubscribe
);
router.delete(
  '/:SubscribeId',
  authorizationSubscribe,
  SubscribeController.deleteSubscribe
);
router.patch(
  '/:SubscribeId/up-vote',
  authorizationSubscribe,
  SubscribeController.updateSubscribeUpVote
);
router.patch(
  '/:SubscribeId/neutral-vote',
  authorizationSubscribe,
  SubscribeController.updateSubscribeNeutralVote
);
router.patch(
  '/:SubscribeId/down-vote',
  authorizationSubscribe,
  SubscribeController.updateSubscribeDownVote
);

module.exports = router;