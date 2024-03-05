const Router = require("express");
const router = new Router();
const OrganizerController = require('../controller/organizer.controller')

router.get("/organizers", OrganizerController.getOrganizers);
router.post("/organizers", OrganizerController.createOrganizer);
router.get("/organizers/:id", OrganizerController.getOrganizer);
router.put("/organizers/:id", OrganizerController.updateOrganizer);

module.exports = router;