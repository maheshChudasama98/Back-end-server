const Token = require("../../middlewares/TokenMiddleware")
const categoryController = require("../controllers/Category.controller")
module.exports = (app) => {
    app.post("/api/category/modify", Token, categoryController.categoryModifyController)
    app.get("/api/category/list", Token, categoryController.categoryFetchListController)
    app.delete("/api/category/remove/:id", Token, categoryController.categoryDeleteController)
}