const Router = require("express");
const router = new Router();
const FavouriteMasterController = require('../controller/favouriteMaster.controller')

router.get("/favouriteMasters", FavouriteMasterController.getFavouriteMasters);
router.post("/favouriteMasters", FavouriteMasterController.createFavouriteMaster);
router.delete("/favouriteMasters/:id", FavouriteMasterController.deleteFavouriteMaster);

module.exports = router;