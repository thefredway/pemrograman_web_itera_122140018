import { useState, useEffect } from "react";
import { useBooks } from "../context/BookContext";
import Rating from "../components/Rating";

const BookForm = ({ editBook, setEditBook }) => {
  const { addBook, updateBook } = useBooks();

  // State buat simpan data buku yang lagi diisi atau diedit
  const [book, setBook] = useState({
    title: "",
    author: "",
    status: "owned",
    rating: 0,
  });

  // Kalau lagi mode edit, isi form-nya pakai data buku yang dipilih
  useEffect(() => {
    if (editBook) {
      setBook(editBook);
    } else {
      setBook({ title: "", author: "", status: "owned", rating: 0 });
    }
  }, [editBook]);

  // Proses submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book.title || !book.author) return; // Validasi simpel

    if (editBook) {
      updateBook(editBook.id, book); // Update data buku
      setEditBook(null); // Keluar dari mode edit
    } else {
      addBook(book); // Tambah buku baru
    }

    // Reset form setelah submit
    setBook({ title: "", author: "", status: "owned", rating: 0 });
  };

  // Batal edit, reset semuanya
  const handleCancel = () => {
    setEditBook(null);
    setBook({ title: "", author: "", status: "owned", rating: 0 });
  };

  // Ubah nilai rating
  const handleRate = (rating) => {
    setBook({ ...book, rating });
  };

  return (
    <form onSubmit={handleSubmit} className="box">
      <div className="field">
        <label htmlFor="title" className="label">
          Judul Buku
        </label>
        <div className="control">
          <input
            id="title"
            className="input"
            type="text"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            placeholder="Masukkan judul buku"
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="author" className="label">
          Penulis
        </label>
        <div className="control">
          <input
            id="author"
            className="input"
            type="text"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            placeholder="Masukkan nama penulis"
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="status" className="label">
          Status
        </label>
        <div className="control">
          <div className="select is-fullwidth">
            <select
              id="status"
              value={book.status}
              onChange={(e) => setBook({ ...book, status: e.target.value })}
            >
              <option value="owned">Sudah Dimiliki</option>
              <option value="reading">Sedang Dibaca</option>
              <option value="wishlist">Ingin Dibeli</option>
            </select>
          </div>
        </div>
      </div>

      {/* Kalau status-nya 'reading', tampilkan komponen rating */}
      {book.status === "reading" && (
        <div className="field">
          <label className="label" htmlFor="rating">
            Rating
          </label>
          <div className="control" id="rating">
            <Rating rating={book.rating} onRate={handleRate} editable={true} />
          </div>
        </div>
      )}

      <div className="field is-grouped">
        <div className="control is-expanded">
          <button
            type="submit"
            className={`button is-fullwidth ${
              editBook ? "is-warning" : "is-primary"
            }`}
          >
            {editBook ? "Update Buku" : "Tambah Buku"}
          </button>
        </div>

        {/* Tombol cancel muncul kalau lagi mode edit */}
        {editBook && (
          <div className="control is-expanded">
            <button
              type="button"
              onClick={handleCancel}
              className="button is-light is-fullwidth"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default BookForm;
