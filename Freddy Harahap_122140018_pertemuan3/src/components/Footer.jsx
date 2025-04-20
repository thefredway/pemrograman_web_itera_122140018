const Footer = () => {
  return (
    <footer className="footer has-background-primary has-text-white">
      <div className="content has-text-centered">
        <p>
          <strong>Aplikasi Manajemen Buku Pribadi</strong> by{" "}
          <a href="#" className="has-text-white">
            Freddy Harahap 122140018
          </a>
        </p>
        <p>© {new Date().getFullYear()} Pemrograman Web ITERA</p>
      </div>
    </footer>
  );
};

export default Footer;
