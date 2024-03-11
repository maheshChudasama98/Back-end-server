const MESSAGES = require("../constants/messages")

// ------------ || Include all routers file over here   || ------------ //
module.exports = (app) => {

    // ------------ || Default route path  || ------------ //
    app.get("/", (req, res) => {
        try {
            return res.status(200).send({ status: true, message: MESSAGES.DEFAULT_PATH })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    })
    require("./WebProfile.router")(app)
    require("./Auth.router")(app)
    require("./User.router")(app)
    require("./Education.router")(app)
    require("./Experience.router")(app)
    require("./Project.router")(app)
    require("./Companies.router")(app)
    require("./Skills.router")(app)
    require("./Category.router")(app)
    require("./Timelog.router")(app)
}
