const { Router } = require("express");
const controller = require("../controllers/user.controller");
const checkAuth = require("../middleware/checkAuth");

const router = Router();

router.get("/", checkAuth, controller.getAll);
router.post("/signup", controller.signup);
router.post("/login", controller.login);

module.exports = router;
