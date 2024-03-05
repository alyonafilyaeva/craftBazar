const Router = require("express");
const router = new Router();
const EventController = require('../controller/event.controller')

router.get("/events", EventController.getEvents);
router.post("/events", EventController.createEvent);
router.get("/events/:id", EventController.getEvent);
router.put("/events/:id", EventController.updateEvent);
router.delete("/events/:id", EventController.deleteEvent);

module.exports = router;