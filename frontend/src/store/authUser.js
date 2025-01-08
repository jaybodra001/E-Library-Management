import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  books: [],
  isFetchingBooks: false, 
  isBorrowing: false,

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Logged in successfully");
      return true;
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response.data.message || "Login failed");
    }
  },

  logout: async () => {
		set({ isLoggingOut: true });
		try {
			await axios.post("/api/v1/auth/logout");
			set({ user: null, isLoggingOut: false });
			toast.success("Logged out successfully");
		} catch (error) {
			set({ isLoggingOut: false });
			toast.error(error.response.data.message || "Logout failed");
		}
	},

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },

  fetchBooks: async () => {
    set({ isFetchingBooks: true });
    try {
      const response = await axios.get("/api/v1/auth/book");
      set({ books: response.data.books, isFetchingBooks: false });
      toast.success("Books fetched successfully");
    } catch (error) {
      set({ isFetchingBooks: false });
      toast.error(error.response.data.message || "Failed to fetch books");
    }
  },
 
  borrowBook: async (bookId) => {
    set({ isBorrowing: true });
    try {
      const response = await axios.post(
        "/api/v1/auth/borrow",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming the token is stored in localStorage
          },
        }
      );
      toast.success("Book borrowed successfully!");
      set((state) => ({
        books: state.books.map((book) =>
          book._id === bookId ? { ...book, isBorrowed: true } : book
        ),
        isBorrowing: false,
      }));
    } catch (error) {
      set({ isBorrowing: false });
      toast.error(error.response?.data?.message || "Failed to borrow the book");
    }
  },
}));

