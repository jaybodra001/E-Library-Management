import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publicationDate: "1925",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publicationDate: "1960",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      publicationDate: "1949",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      publicationDate: "1813",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      publicationDate: "1951",
      image: "https://via.placeholder.com/150",
    },
  ]);

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
                  key={book.id}
                  className="p-4 bg-gray-100 shadow-lg rounded-lg hover:shadow-xl transition flex flex-col items-center"
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-32 h-40 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-lg font-bold text-gray-800">{book.title}</h2>
                  <p className="text-gray-600 mt-2">by {book.author}</p>
                  <p className="text-gray-500 text-sm mt-1 mb-4">
                    Published: {book.publicationDate}
                  </p>
                  <button
                    onClick={() => alert(`Borrowed: ${book.title}`)} // Replace with actual borrow logic
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition mb-2"
                  >
                    Borrow
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
