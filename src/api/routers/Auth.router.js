const authController = require("../controllers/Auth.controller")
module.exports = (app) => {
    app.post("/api/login", authController.loginController)
}