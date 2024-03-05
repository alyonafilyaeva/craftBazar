const Router = require("express");
const router = new Router();
const UserController = require("../controller/user.controller");
const userController = require("../controller/user.controller");

router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);
router.delete("/users/:id", userController.deleteUser)

module.exports = router;
