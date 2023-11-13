const Token = require("../../middlewares/TokenMiddleware")
const educationController = require("../controllers/Education.controller")
module.exports = (app) => {
    app.post("/api/education/modify", Token, educationController.educationModifyController)
    app.get("/api/education/list", Token, educationController.educationFetchListController)
    app.delete("/api/education/remove/:id", Token, educationController.educationDeleteController)
}