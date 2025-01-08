import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuthStore } from "../store/authUser";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { books, fetchBooks, user, borrowBook } = useAuthStore(); // Added borrowBook

  useEffect(() => {
    fetchBooks(); // Fetch books when the component mounts
  }, [fetchBooks]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const handleBorrow = async (bookId) => {
    if (!user) {
      alert("Please log in to borrow a book.");
      return;
    }

    try {
      await borrowBook(bookId); // Use borrowBook from the store
      fetchBooks(); // Refresh the book list to update availability
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert("An error occurred while borrowing the book.");
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: "#e1dcc5" }}>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Search and Book List Section */}
          <div className="w-full bg-white p-6 rounded-lg shadow-md">
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search Books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="p-4 bg-gray-100 shadow-lg rounded-lg hover:shadow-xl transition flex flex-col items-center"
                >
                  <img
                    src={book.imageUrl || "https://via.placeholder.com/150"}
                    alt={book.title}
                    className="w-32 h-40 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-lg font-bold text-gray-800">{book.title}</h2>
                  <p className="text-gray-600 mt-2">by {book.author}</p>
                  <p className="text-gray-500 text-sm mt-1 mb-4">
                    Published: {formatDate(book.publishDate)}
                  </p>
                  <button
                    onClick={() => handleBorrow(book._id)}
                    disabled={book.isBorrowed} // Disable if the book is already borrowed
                    className={`w-full py-2 rounded-lg transition mb-2 ${
                      book.isBorrowed
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    {book.isBorrowed ? "Borrowed" : "Borrow"}
                  </button>
                </div>
              ))}
              {filteredBooks.length === 0 && (
                <p className="col-span-full text-center text-gray-600">
                  No books found.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
