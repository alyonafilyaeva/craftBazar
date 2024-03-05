const Router = require("express");
const router = new Router();
const FavouriteEventController = require('../controller/favouriteEvent.controller')

router.get("/favouriteEvents", FavouriteEventController.getFavouriteEvents);
router.post("/favouriteEvents", FavouriteEventController.createFavouriteEvent);
router.delete("/favouriteEvents/:id", FavouriteEventController.deleteFavouriteEvent);

module.exports = router;