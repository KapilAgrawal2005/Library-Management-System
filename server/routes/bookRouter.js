const express = require("express");
const router = express.Router();
const {isAuthenticated, isAuthorized} = require("../middleware/authMiddleware");
const {addBook, deleteBook, getAllBooks} = require("../controllers/bookController");



router.post("/admin/addbook", isAuthenticated, isAuthorized("Admin"), addBook);
router.delete("/admin/deletebook/:id", isAuthenticated, isAuthorized("Admin"), deleteBook);
router.get("/allbooks", isAuthenticated, getAllBooks);


module.exports = router;