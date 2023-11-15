const Token = require("../../middlewares/TokenMiddleware")
const companyController = require("../controllers/Companies.controller")
module.exports = (app) => {
    app.post("/api/company/modify", Token, companyController.companyModifyController)
    app.get("/api/company/list", Token, companyController.companyFetchListController)
    app.delete("/api/company/remove/:id", Token, companyController.companyDeleteController)
}