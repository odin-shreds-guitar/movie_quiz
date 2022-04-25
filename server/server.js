require("dotenv").config();
const express= require("express");
const cors= require("cors");
const cookieParser= require("cookie-parser");
const app= express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));

app.use(cookieParser());



require('./config/mongoose.config');
require('./routes/moviequiz.routes')(app);
require("./routes/user.routes")(app);
require("./routes/comment.routes")(app)
require("./routes/likes.routes")(app)

app.listen(8000, ()=> console.log("you are connected to your port"));