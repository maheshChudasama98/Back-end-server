const Token = require("../../middlewares/TokenMiddleware")
const timelogController = require("../controllers/Timelog.controller")
module.exports = (app) => {
    app.post("/api/timelog/modify", Token, timelogController.timelogModifyController)
    app.get("/api/timelog/list", Token, timelogController.timelogFetchListController)
    app.delete("/api/timelog/remove/:id", Token, timelogController.timelogDeleteController)
}