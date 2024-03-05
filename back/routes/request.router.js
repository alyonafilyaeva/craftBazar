const Router = require("express");
const router = new Router();
const RequestController = require('../controller/request.controller')

router.get("/requests/", RequestController.getRequests);
router.post("/requests", RequestController.createRequest);
router.get("/requests/:id", RequestController.getReqest);
router.patch("/requests/:id", RequestController.rejectRequest);
router.delete("/requests/:id", RequestController.acceptRequest);

module.exports = router;