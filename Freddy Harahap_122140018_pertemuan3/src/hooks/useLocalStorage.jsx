import { createContext, useContext, useState, useEffect } from "react";

const BookContext = createContext(); // Membuat context untuk data buku

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(() => {
    // Ambil buku dari localStorage saat pertama kali
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : []; // Kalau ada, load, kalau nggak, pakai array kosong
  });

  const [filter, setFilter] = useState("all"); // Filter status buku
  const [searchQuery, setSearchQuery] = useState(""); // Query pencarian buku

  // Sync data books ke localStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    // Menambahkan buku baru dengan ID unik
    const newBook = { ...book, id: Date.now() };
    setBooks([...books, newBook]);
  };

  const updateBook = (id, updatedBook) => {
    // Memperbarui buku berdasarkan ID
    setBooks(books.map((book) => (book.id === id ? updatedBook : book)));
  };

  const deleteBook = (id) => {
    // Menghapus buku berdasarkan ID
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <BookContext.Provider
      value={{
        books,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        addBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext); // Mengambil context buku
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider"); // Pastikan context digunakan di dalam provider
  }
  return context; // Kembalikan context
};
