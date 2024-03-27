const Router = require("express");
const router = new Router();
const EventController = require('../controller/event.controller')
const CategoryController = require('../controller/category.controller')

router.get("/categories", CategoryController.getCategories);
router.get("/categories/:id", CategoryController.getCategory);

module.exports = router;