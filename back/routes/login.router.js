const Router = require("express");
const router = new Router();
const LoginController = require('../controller/login.controller')

router.post("/login", LoginController.loginUser);

module.exports = router;