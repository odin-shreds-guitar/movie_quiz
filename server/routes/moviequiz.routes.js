const MovieQuizController = require('../controllers/moviequiz.controller')

module.exports = function(app){
	app.get('/', MovieQuizController.index);
}