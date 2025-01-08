import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ManageBook = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      imageUrl: "https://via.placeholder.com/150",
      publishDate: "1925-04-10",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      imageUrl: "https://via.placeholder.com/150",
      publishDate: "1960-07-11",
    },
    // Add more sample books as needed
  ]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    imageUrl: "",
    publishDate: "",
  });

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    const newBookData = { ...newBook, id: Date.now() }; // Generate a unique id
    setBooks([...books, newBookData]);
    setNewBook({ title: "", author: "", imageUrl: "", publishDate: "" }); // Reset form
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const handleEditBook = (id) => {
    const bookToEdit = books.find((book) => book.id === id);
    setNewBook(bookToEdit);
  };

  const handleCancel = () => {
    setNewBook({ title: "", author: "", imageUrl: "", publishDate: "" }); // Reset form
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: "#e1dcc5" }}>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isVisible={isSidebarVisible} />
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Search and Add Book Section */}
          <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Manage Books</h1>

            

            {/* Add Book Form */}
            <form onSubmit={handleAddBook} className="mb-6">
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-semibold">
                  Book Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="author" className="block text-gray-700 font-semibold">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block text-gray-700 font-semibold">
                  Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={newBook.imageUrl}
                  onChange={(e) => setNewBook({ ...newBook, imageUrl: e.target.value })}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="publishDate" className="block text-gray-700 font-semibold">
                  Publish Date
                </label>
                <input
                  type="date"
                  id="publishDate"
                  name="publishDate"
                  value={newBook.publishDate}
                  onChange={(e) => setNewBook({ ...newBook, publishDate: e.target.value })}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition"
                >
                  {newBook.id ? "Update Book" : "Add Book"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg transition ml-4"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Book List */}
          <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Book List</h2>
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search Books..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <div key={book.id} className="p-4 bg-gray-100 shadow-lg rounded-lg hover:shadow-xl transition">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-32 h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
                  <p className="text-gray-600 mt-2 mb-4">by {book.author}</p>
                  <p className="text-gray-500 text-sm">Published: {book.publishDate}</p>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => handleEditBook(book.id)}
                      className="bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {filteredBooks.length === 0 && (
                <p className="col-span-full text-center text-gray-600">No books found.</p>
              )}
            </div>
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

export default ManageBook;
