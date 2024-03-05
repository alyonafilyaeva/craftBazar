const Router = require("express");
const router = new Router();
const MasterController = require('../controller/master.controller')

router.get("/masters", MasterController.getMasters);
router.post("/masters", MasterController.createMaster);
router.get("/masters/:id", MasterController.getMaster);
router.put("/masters/:id", MasterController.updateMaster);

module.exports = router;