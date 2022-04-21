const UserCon= require("../controllers/user.controller");

module.exports=(app)=>{
    app.post("/api/users/register", UserCon.register);
    app.post("/api/users/login", UserCon.login);
    app.post("/api/users/logout", UserCon.logout);
    app.get("/api/users/logged", UserCon.getLoggedUser);
    app.get("/api/users", UserCon.findAllUsers);
    app.get("/api/users/:id", UserCon.findOneUser);
}