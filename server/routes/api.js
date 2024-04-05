const express = require('express');
const parentController = require('../controllers/parentController.js')
const router = express.Router();

router.post('/quizzes')

router.get('/quizzes')

router.post('/rounds')

// GET "Rounds"
router.get('/rhymesoftheday', parentController.getTodayRounds);


module.exports = router;