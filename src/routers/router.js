const ControllerUser = require("../Controllers/UserControler");
const router = require("express").Router();
const { authentication } = require("../middelwares/auth");

router.post("/user", ControllerUser.register);
router.post("/login", ControllerUser.login);
router.get("/", authentication, ControllerUser.read);
router.get("/user/:accountNumber", authentication, ControllerUser.getUserByAccountNumber);
router.get("/user/:identityNumber", authentication, ControllerUser.getUserByIdentityNumber);
router.put("/user/:id", authentication, ControllerUser.update);
router.delete("/user/:id", authentication, ControllerUser.deleteUser);

module.exports = router;
