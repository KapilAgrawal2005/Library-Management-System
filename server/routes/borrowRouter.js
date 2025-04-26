const express = require("express");
const router = express.Router();
const {borrowedBooks, recordBorrowedBooks, getBorrowedBooksForAdmin, returnBorrowBook} = require("../controllers/borrowController");
const {isAuthenticated, isAuthorized} = require("../middleware/authMiddleware");

router.post("/record-borrow-book/:id", isAuthenticated, isAuthorized("Admin"), recordBorrowedBooks);
router.get("/borrowed-books-by-users", isAuthenticated,  isAuthorized("Admin"), getBorrowedBooksForAdmin);
router.get("/my-borrowed-books", isAuthenticated, borrowedBooks);
router.put("/return-borrowed-book/:bookId", isAuthenticated, isAuthorized("Admin"), returnBorrowBook);

module.exports = router;