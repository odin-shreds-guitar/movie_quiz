const ScoreController = require('../controllers/moviequiz.controller');
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
	// app.get('/', ScoreController.index);

	app.post("/api/scores", authenticate, ScoreController.createScore);
    
    app.get("/api/scores", ScoreController.getAllScores);
	
    app.get("/api/scores/:id", ScoreController.getOneScore);

    app.get("/api/scoresbyuser/:username", authenticate, ScoreController.findAllScoresByUser);
    // app.get("/api/scoresbyuser/:username", ScoreController.findAllScoresByUser);
    

    app.delete("/api/scores/:id", ScoreController.deleteScore);

}