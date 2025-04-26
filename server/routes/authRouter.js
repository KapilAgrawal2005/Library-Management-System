const express = require("express");
const { signup, verifyOTP, login, logout, getUser, forgotPasswordEmail, resetPassword, updatePassword } = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/otp-verification", verifyOTP);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.post("/password/forgot", forgotPasswordEmail);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isAuthenticated, updatePassword);

module.exports = router;