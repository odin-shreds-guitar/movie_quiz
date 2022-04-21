require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
require('./config/mongoose.config');
app.use(cors()); // order is important here
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('./routes/moviequiz.routes')(app);
require("./routes/user.routes")(app);

app.listen(8000, () => {
	console.log("Server is listening on port 8000")
})