require("dotenv").config();
const express= require("express");
const cors= require("cors");
const cookieParser= require("cookie-parser");
const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    credentials:true,
    origin:"http://localhost:3000",
}));

app.use(cookieParser());



require('./config/mongoose.config');

require("./routes/moviequiz.routes")(app);
require("./routes/user.routes")(app);
require("./routes/comment.routes")(app)


// app.listen(8000, ()=> console.log("you are connected to your port"));

app.listen(process.env.MY_PORT, () => 
    console.log(`Listening on Port ${process.env.MY_PORT}`))