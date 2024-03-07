const router = require('express').Router();
const openAIRoutes = require('./openAIRoutes');

router.use('/openai', openAIRoutes);

module.exports = router;
