const router = require('express').Router();
const {
  createFlashCards,
} = require('../../controller/openAIController');

router.route('/createFlashCards').post(createFlashCards);

module.exports = router;