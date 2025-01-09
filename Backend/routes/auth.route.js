import express from 'express'
import { authCheck, signup, login,logout, createBook, editBook, deleteBook, borrowBook, returnBook, getBooks } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router()


router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.get("/book", getBooks)
router.post("/book", createBook)
router.put("/book/:id", protectRoute, editBook)
router.delete("/book/:id", protectRoute, deleteBook)

router.post("/book/:id/borrow", protectRoute, borrowBook)
router.post("/book/:id/return", protectRoute, returnBook)

router.get("/authCheck", protectRoute, authCheck)

export default router;

