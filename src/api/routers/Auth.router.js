const authController = require("../controllers/Auth.controller")
module.exports = (app) => {
    app.post("/api/login", authController.loginController)
    app.post("/api/forget/password", authController.forgotPasswordController)
    app.post("/api/change/password", authController.resetPasswordController)
}