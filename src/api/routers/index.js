// ------------ || Include all routers file over here   || ------------ //
module.exports = (app) => {
    require("./Auth.router")(app)
    require("./User.router")(app)
    require("./Education.router")(app)
    require("./Experience.router")(app)
    require("./Project.router")(app)
    require("./Companies.router")(app)
    require("./Skills.router")(app)
}
