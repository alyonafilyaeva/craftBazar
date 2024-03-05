const Router = require("express");
const router = new Router();
const MasterEventController = require('../controller/masterEvent.controller')

router.get("/mastersEvents", MasterEventController.getMastersEvent);
router.post("/mastersEvents", MasterEventController.createMasterEvent);
router.put("/mastersEvents/:id", MasterEventController.updateMasterEvent);

module.exports = router;