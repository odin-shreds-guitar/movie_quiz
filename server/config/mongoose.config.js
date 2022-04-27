const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/moviequiz", {
// mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
	useNewUrlParser : true,
	useUnifiedTopology : true,
})
	.then(() => 
		console.log(`Connected to ${process.env.DB_NAME} database!`))
		// console.log("DB connected"))

	.catch(() => 
		console.log("There was an error connecting to the DB"))