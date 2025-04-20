import { useBooks } from "../context/BookContext";
import Rating from "./Rating";
import PropTypes from "prop-types";

const BookList = ({ setEditBook }) => {
  const { books, deleteBook, filter, setFilter, searchQuery, setSearchQuery } =
    useBooks();

  // Filter dan pencarian buku berdasarkan status dan input pencarian
  const filteredBooks = books.filter((book) => {
    const matchesFilter = filter === "all" || book.status === filter;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="box">
      {/* Bagian filter dan search */}
      <div className="level">
        <div className="level-left">
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Cari buku..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update keyword pencarian
              />
              <span className="icon is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="level-right">
          <div className="field">
            <div className="control">
              <div className="select">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)} // Ganti filter status
                >
                  <option value="all">Semua</option>
                  <option value="owned">Milik Saya</option>
                  <option value="reading">Sedang Dibaca</option>
                  <option value="wishlist">Ingin Dibeli</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tampilkan pesan kalau gak ada buku yang cocok */}
      {filteredBooks.length === 0 ? (
        <p className="has-text-centered py-4">Tidak ada buku ditemukan</p>
      ) : (
        // Tampilkan list buku
        <div className="columns is-multiline">
          {filteredBooks.map((book) => (
            <div key={book.id} className="column is-one-third">
              <div className={`card book-card ${book.status}`}>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{book.title}</p>
                      <p className="subtitle is-6">Oleh: {book.author}</p>
                    </div>
                  </div>
                  <div className="content">
                    {/* Status buku dalam bentuk tag */}
                    <span className={`tag ${getStatusColor(book.status)}`}>
                      {getStatusText(book.status)}
                    </span>
                    {/* Kalau status "reading", tampilkan rating */}
                    {book.status === "reading" && (
                      <div className="mt-2">
                        <Rating rating={book.rating} editable={false} />
                      </div>
                    )}
                  </div>
                </div>
                <footer className="card-footer">
                  {/* Tombol edit dan hapus */}
                  <button
                    onClick={() => setEditBook(book)}
                    className="card-footer-item button is-warning is-light"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="card-footer-item button is-danger is-light"
                  >
                    Hapus
                  </button>
                </footer>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Fungsi bantu buat tampilin teks status
const getStatusText = (status) => {
  switch (status) {
    case "owned":
      return "Sudah Dimiliki";
    case "reading":
      return "Sedang Dibaca";
    case "wishlist":
      return "Ingin Dibeli";
    default:
      return "";
  }
};

// Fungsi bantu buat warnain tag status
const getStatusColor = (status) => {
  switch (status) {
    case "owned":
      return "is-success";
    case "reading":
      return "is-info";
    case "wishlist":
      return "is-warning";
    default:
      return "is-light";
  }
};

BookList.propTypes = {
  setEditBook: PropTypes.func.isRequired,
};

export default BookList;
