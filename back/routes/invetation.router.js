const Router = require("express");
const router = new Router();
const InvetationController = require('../controller/invetation.controller')

router.get("/invetations/", InvetationController.getInvetations);
router.post("/invetations", InvetationController.createInvetation);
router.get("/invetations/:id", InvetationController.getInvetation);
router.patch("/invetations/:id", InvetationController.rejectInvetation);
router.delete("/invetations/:id", InvetationController.acceptInvetation);

module.exports = router;