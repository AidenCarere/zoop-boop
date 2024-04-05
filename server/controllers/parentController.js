const db = require('../db.js');

const parentController = {};

// POST /quizzes: To create a new quiz (and its rounds).
parentController.createQuiz = (req, res, next) => {

}

// POST /rounds: To create rounds for a quiz.


// GET /quizzes/:id: To get details of a specific quiz.


// GET /rounds: To retrieve data for today's quiz.
parentController.getTodayRounds = async (req, res) => {
    try {
      // Step 1: Get today's quiz
      const quizQueryText = 'SELECT * FROM "Quizzes" WHERE publish_date = CURRENT_DATE;';
      const quizResult = await db.query(quizQueryText);
  
      if (quizResult.rows.length === 0) {
        return res.status(404).json({ message: 'No quiz found for today.' });
      }
  
      // Assuming there's only one quiz per day
      const todayQuizId = quizResult.rows[0].id;
  
      // Step 2: Get rounds for today's quiz
      const roundsQueryText = 'SELECT * FROM "Rounds" WHERE quiz_id = $1;';
      const roundsResult = await db.query(roundsQueryText, [todayQuizId]);
  
      res.json(roundsResult.rows);
    } catch (error) {
      console.error('Error getting today\'s "Rounds":', error);
      res.status(500).json({ message: 'Error fetching today\'s rounds.' });
    }
  };


module.exports = parentController;