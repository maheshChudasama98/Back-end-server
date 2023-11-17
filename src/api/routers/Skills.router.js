const Token = require("../../middlewares/TokenMiddleware")
const skillController = require("../controllers/Skills.controller")
module.exports = (app) => {
    app.post("/api/skill/modify", Token, skillController.skillModifyController)
    app.post("/api/skill/list", Token, skillController.skillFetchListController)
    app.delete("/api/skill/remove/:id", Token, skillController.skillDeleteController)
}