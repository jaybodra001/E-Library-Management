import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/authUser";
import toast from "react-hot-toast";

const ManageBook = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingBook, setEditingBook] = useState(null); // Track book being edited
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    imageUrl: "",
    publishDate: "",
  });

  const { books, fetchBooks, createBook, updateBook, deleteBook, isFetchingBooks } = useAuthStore();

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update a book
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await updateBook(editingBook._id, newBook);
        toast.success("Book updated successfully!");
      } else {
        await createBook(newBook);
        fetchBooks()
        toast.success("Book created successfully!");
      }
      setNewBook({ title: "", author: "", imageUrl: "", publishDate: "" });
      setEditingBook(null);
    } catch (error) {
      toast.error("Failed to save the book.");
    }
  };

  // Start editing a book
  const handleEditBook = (book) => {
    setEditingBook(book);
    setNewBook(book);
  };

  // Cancel editing or adding a book
  const handleCancel = () => {
    setNewBook({ title: "", author: "", imageUrl: "", publishDate: "" });
    setEditingBook(null);
  };

  // Delete a book
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      toast.success("Book deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete the book.");
    }
  };

  // Filter books based on search query
  const filteredBooks = (books || []).filter((book) =>
    book?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: "#e1dcc5" }}>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isVisible={isSidebarVisible} />
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Search and Add/Edit Book Section */}
          <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              {editingBook ? "Edit Book" : "Manage Books"}
            </h1>
            <form onSubmit={handleSubmit} className="mb-6">
              {/* Form Fields */}
              {["title", "author", "imageUrl", "publishDate"].map((field, index) => (
                <div key={index} className="mb-4">
                  <label
                    htmlFor={field}
                    className="block text-gray-700 font-semibold capitalize"
                  >
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type={field === "publishDate" ? "date" : "text"}
                    id={field}
                    name={field}
                    value={newBook[field]}
                    onChange={handleInputChange}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              ))}
              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition"
                >
                  {editingBook ? "Update Book" : "Add Book"}
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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* Book Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {isFetchingBooks ? (
                <p className="text-center col-span-full">Loading books...</p>
              ) : filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <div
                    key={book._id}
                    className="p-4 bg-gray-100 shadow-lg rounded-lg hover:shadow-xl transition"
                  >
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-32 h-40 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
                    <p className="text-gray-600 mt-2 mb-4">by {book.author}</p>
                    <p className="text-gray-500 text-sm">
                      Published: {new Date(book.publishDate).toISOString().split("T")[0]}
                    </p>
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => handleEditBook(book)}
                        className="bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-600">No books found.</p>
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
