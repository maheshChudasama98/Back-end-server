const Token = require("../../middlewares/TokenMiddleware")
const projectController = require("../controllers/Project.controller")
module.exports = (app) => {
    app.post("/api/project/modify", Token, projectController.projectModifyController)
    app.get("/api/project/list", Token, projectController.projectFetchListController)
    app.delete("/api/project/remove/:id", Token, projectController.projectDeleteController)
}