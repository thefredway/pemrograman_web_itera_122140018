import { useBooks } from "../context/BookContext";

export const useBookStats = () => {
  const { books } = useBooks(); // Ambil data buku dari context

  const totalBooks = books.length; // Total jumlah buku
  const readingBooks = books.filter((book) => book.status === "reading"); // Buku yang sedang dibaca
  const totalRating = readingBooks.reduce(
    (acc, book) => acc + (book.rating || 0), // Hitung total rating dari buku yang sedang dibaca
    0
  );

  const stats = {
    total: totalBooks, // Total buku
    owned: books.filter((book) => book.status === "owned").length, // Buku yang sudah dimiliki
    reading: readingBooks.length, // Buku yang sedang dibaca
    wishlist: books.filter((book) => book.status === "wishlist").length, // Buku dalam wishlist
    // Rata-rata rating buku yang sedang dibaca
    avgRating:
      readingBooks.length > 0
        ? parseFloat((totalRating / readingBooks.length).toFixed(1)) // Jika ada buku yang sedang dibaca, hitung rata-rata
        : 0, // Kalau nggak ada buku yang sedang dibaca, rata-rata 0
  };

  return stats; // Kembalikan stats
};
