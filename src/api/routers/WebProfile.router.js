const webController = require("../controllers/WebProfile.controller")
module.exports = (app) => {
    app.get("/api/profile", webController.webProfileController)
}
