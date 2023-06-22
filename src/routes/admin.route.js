const router = require("express").Router();
const adminController = require('../controllers/admin.controller');

router.get("/", adminController.getAdmin);
router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);
router.post("/auth", adminController.authAdmin);

module.exports = router;
