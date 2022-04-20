const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/moviequiz", {
	useNewUrlParser : true,
	useUnifiedTopology : true,
})
	.then(() => console.log("DB connected"))
	.catch(() => console.log("There was an error connecting to the DB"))