const router = require("express").Router();
const userController = require('../controllers/user.controller');

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/auth", userController.authUser);
router.put("/", userController.updateUser);



module.exports = router;
