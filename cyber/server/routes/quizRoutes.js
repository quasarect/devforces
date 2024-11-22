const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/module', quizController.getModuleSpecificQuizzes);
router.get('/general', quizController.getDailyGeneralQuizzes);

module.exports = router;
