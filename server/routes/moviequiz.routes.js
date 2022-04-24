const MovieQuizController = require('../controllers/moviequiz.controller')

module.exports = function(app){
	app.get('/', MovieQuizController.index);
	// app.post('/project', MovieQuizController.createProject);
	// app.get('/projects', MovieQuizController.getAllProjects);
	// app.get('/projects/:id', MovieQuizController.getProject);
	// app.put('/projects/:id', MovieQuizController.updateProject);
	// app.delete('/projects/:id', MovieQuizController.deleteProject )
}