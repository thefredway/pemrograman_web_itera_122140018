import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false); // Buat toggle menu di mobile

  return (
    <nav className="navbar is-primary" role="navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <strong>Aplikasi Manajemen Buku Pribadi</strong>
          </Link>

          {/* Tombol hamburger buat mobile */}
          <button
            className={`navbar-burger ${isActive ? "is-active" : ""}`}
            onClick={() => setIsActive(!isActive)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Menu utama, muncul/tersembunyi tergantung toggle */}
        <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-end">
            <Link
              to="/"
              className="navbar-item"
              onClick={() => setIsActive(false)} // Tutup menu saat klik
            >
              Home
            </Link>
            <Link
              to="/stats"
              className="navbar-item"
              onClick={() => setIsActive(false)} // Tutup juga di sini
            >
              Stats
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
