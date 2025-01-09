import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/authUser"; // Import the store

const BorrowBook = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { books, fetchBooks, returnBook, user } = useAuthStore(); // Get books, fetchBooks, returnBook, and user from the store

  useEffect(() => {
    fetchBooks(); // Fetch the books when the component mounts
  }, [fetchBooks]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleReturnBook = async (bookId) => {
    await returnBook(bookId); // Call the returnBook method from the store
  };

  // Filter out books that the user has borrowed (isBorrowed: true and borrowedBy matches the user ID)
  const borrowedBooks = books.filter((book) => book.isBorrowed && book.borrowedBy === user._id);

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: "#e1dcc5" }}>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isVisible={isSidebarVisible} />
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Borrowed Books Section */}
          <div className="w-full bg-white p-8 rounded-lg shadow-xl">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Borrowed Books</h1>
            {borrowedBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {borrowedBooks.map((book) => (
                  <div
                    key={book._id}
                    className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition transform hover:scale-105 flex flex-col items-center"
                  >
                    <img
                      src={book.imageUrl || "https://via.placeholder.com/150"}
                      alt={book.title}
                      className="w-36 h-48 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h2>
                    <p className="text-gray-600 mb-4">by {book.author}</p>
                    <button
                      onClick={() => handleReturnBook(book._id)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                    >
                      Return
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">You have not borrowed any books yet.</p>
            )}
          </div>
        </main>
      </div>
      <Footer />
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full lg:hidden shadow-md"
      >
        Toggle Sidebar
      </button>
    </div>
  );
};

export default BorrowBook;
