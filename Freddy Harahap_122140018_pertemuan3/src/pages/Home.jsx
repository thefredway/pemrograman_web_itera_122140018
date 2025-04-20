import { useState } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";

const Home = () => {
  const [editBook, setEditBook] = useState(null); // Menyimpan buku yang sedang diedit

  return (
    <div className="columns">
      <div className="column is-one-third">
        {/* Form untuk menambah atau mengedit buku */}
        <BookForm editBook={editBook} setEditBook={setEditBook} />
      </div>
      <div className="column">
        {/* Menampilkan daftar buku */}
        <BookList setEditBook={setEditBook} />
      </div>
    </div>
  );
};

export default Home;
