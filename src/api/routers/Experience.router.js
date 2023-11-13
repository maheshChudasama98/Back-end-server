const Token = require("../../middlewares/TokenMiddleware")
const experienceController = require("../controllers/Experience.controller")
module.exports = (app) => {
    app.post("/api/experience/modify", Token, experienceController.experienceModifyController)
    app.get("/api/experience/list", Token, experienceController.experienceFetchListController)
    app.delete("/api/experience/remove/:id", Token, experienceController.experienceDeleteController)
}