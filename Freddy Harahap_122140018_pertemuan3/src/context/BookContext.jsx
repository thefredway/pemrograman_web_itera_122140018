import { createContext, useContext, useState, useEffect } from "react";

// Membuat context untuk data buku
const BookContext = createContext();

export const BookProvider = ({ children }) => {
  // State untuk buku, nyimpan di localStorage saat pertama kali
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : []; // Ambil dari localStorage atau array kosong
  });

  const [filter, setFilter] = useState("all"); // Filter status buku
  const [searchQuery, setSearchQuery] = useState(""); // Query pencarian buku

  // Sinkronisasi setiap kali 'books' berubah ke localStorage
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  // Menambahkan buku baru
  const addBook = (book) => {
    const newBook = { ...book, id: Date.now() }; // Menambahkan id unik menggunakan waktu
    setBooks([...books, newBook]); // Menambahkannya ke daftar buku
  };

  // Memperbarui buku yang sudah ada
  const updateBook = (id, updatedBook) => {
    setBooks(books.map((book) => (book.id === id ? updatedBook : book))); // Update berdasarkan id
  };

  // Menghapus buku berdasarkan id
  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id)); // Hapus buku dengan id yang sesuai
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
      {children} {/* Menyediakan context ke komponen anak */}
    </BookContext.Provider>
  );
};

// Custom hook untuk mengakses context
export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider"); // Pastikan hook dipakai dalam BookProvider
  }
  return context; // Kembalikan context yang berisi state dan fungsi
};
