// ------------ || Include all routers file over here   || ------------ //
module.exports = (app) => {
    require("./Auth.router")(app)
    require("./User.router")(app)
}
