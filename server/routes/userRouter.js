const express = require("express");
const router = express.Router();
const {getAllUsers, registerNewAdmin} = require("../controllers/userController");
const {isAuthenticated, isAuthorized} = require("../middleware/authMiddleware");

router.get("/all-users", isAuthenticated, isAuthorized("Admin"), getAllUsers);
router.post("/add/new-admin", isAuthenticated, isAuthorized("Admin"), registerNewAdmin);

module.exports = router;