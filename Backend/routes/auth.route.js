import express from 'express'
import { authCheck, signup, login,logout, createBook, editBook, deleteBook, borrowBook, returnBook } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router()


router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.get("/book", createBook)
router.put("/book/:id", protectRoute, editBook)
router.delete("/book/:id", protectRoute, deleteBook)

router.post("/borrow", protectRoute, borrowBook)
router.post("/return", protectRoute, returnBook)

router.get("/authCheck", protectRoute, authCheck)

export default router;

