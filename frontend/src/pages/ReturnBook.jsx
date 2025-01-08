import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ReturnBook = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [returnedBooks, setReturnedBooks] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div
      className="flex flex-col h-screen"
      style={{ backgroundColor: "#e1dcc5" }}
    >
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isVisible={isSidebarVisible} />
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Returned Books Section */}
          <div className="w-full bg-white p-8 rounded-lg shadow-xl">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Returned Books</h1>
            {returnedBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {returnedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition transform hover:scale-105 flex flex-col items-center"
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-36 h-48 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h2>
                    <p className="text-gray-600 mb-4">by {book.author}</p>
                    <button
                      onClick={() => alert(`Re-borrowing: ${book.title}`)} // Add re-borrow logic here
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                    >
                      Re-borrow
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">You have not returned any books yet.</p>
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

export default ReturnBook;
