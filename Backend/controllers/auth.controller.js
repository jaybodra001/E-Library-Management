import { User } from "../models/user.model.js";
import { Book } from "../models/book.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import mongoose from "mongoose";

// User Signup
export async function signup(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,})$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 6 characters!" });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists!" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    generateTokenAndSetCookie(newUser._id, res);

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (e) {
    console.log("Error in SignUp controller:" + e.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
}

// User Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const existingUserByEmail = await User.findOne({ email: email });
    if (!existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email does not exist!" });
    }
    const isValidPassword = await bcryptjs.compare(
      password,
      existingUserByEmail.password
    );
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password!" });
    }
    generateTokenAndSetCookie(existingUserByEmail._id, res);

    res.status(200).json({ success: true, message: "Login successful!" });
  } catch (e) {
    console.log("Error in Login controller:" + e.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
}

//user auth..
export async function authCheck(req, res) {
  try {
    console.log("req.user:", req.user);
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// User Logout
export async function logout(req, res) {
  try {
    res.clearCookie("jwt-library");
    res
      .status(200)
      .json({ success: true, message: "Logged out successfully!" });
  } catch (e) {
    console.log("Error in Logout controller:" + e.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
}

// Book Borrow
export async function borrowBook(req, res) {
  try {
    const { id } = req.params;
    const user = req.user;

    console.log(id)
    console.log(user)

    const book = await Book.findById(id);



    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found!" });
    }

    if (book.isBorrowed) {
      return res.status(400).json({ success: false, message: "Book is already borrowed!" });
    }

    book.isBorrowed = true;
    book.borrowedBy = user._id;

    user.borrowedBooks.push(id);

    await book.save();
    await user.save();

    res.status(200).json({ success: true, message: "Book borrowed successfully!" });
  } catch (e) {
    console.log("Error in borrowBook controller:" + e.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

// Book Return
export async function returnBook(req, res) {
  try {
    const { id } = req.params;
    const user = req.user;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found!" });
    }

    if (!book.isBorrowed || !book.borrowedBy.equals(user._id)) {
      return res.status(400).json({ success: false, message: "You haven't borrowed this book!" });
    }

    book.isBorrowed = false;
    book.borrowedBy = null;

    user.borrowedBooks = user.borrowedBooks.filter(id => !id.equals(bookId));

    await book.save();
    await user.save();

    res.status(200).json({ success: true, message: "Book returned successfully!" });
  } catch (e) {
    console.log("Error in returnBook controller:" + e.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

// Create Book
export async function createBook(req, res) {
  try {
    const { title, author, imageUrl, publishDate } = req.body;

    if (!title || !author || !imageUrl || !publishDate) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    const newBook = new Book({
      title,
      author,
      imageUrl,
      publishDate,
    });

    await newBook.save();

    res.status(201).json({ success: true, message: "Book created successfully!" });
  } catch (e) {
    console.log("Error in createBook controller:" + e.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

// Edit Book
export async function editBook(req, res) {
  try {
    const { id } = req.params;
    const { title, author, imageUrl, publishDate } = req.body;

    console.log("bookid",id)
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found!" });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.imageUrl = imageUrl || book.imageUrl;
    book.publishDate = publishDate || book.publishDate;

    await book.save();

    res.status(200).json({ success: true, message: "Book updated successfully!" });
  } catch (e) {
    console.log("Error in editBook controller:" + e.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

// Delete Book
export async function deleteBook(req, res) {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found!" });
    }

    await book.deleteOne({ _id: id });

    res.status(200).json({ success: true, message: "Book deleted successfully!" });
  } catch (e) {
    console.log("Error in deleteBook controller:" + e.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}


// Fetch All Books
export async function getBooks(req, res) {
  try {
    // Retrieve all books from the database
    const books = await Book.find();

    if (!books || books.length === 0) {
      return res.status(404).json({ success: false, message: "No books found!" });
    }

    res.status(200).json({ success: true, books });
  } catch (e) {
    console.log("Error in getBooks controller:" + e.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}