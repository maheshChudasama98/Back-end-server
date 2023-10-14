const userController = require("../controllers/User.controller")
module.exports = (app) => {
    app.post("/api/user/modify", userController.userModifyController)
    app.delete("/api/user/remove/:id", userController.userDeleteController)
}