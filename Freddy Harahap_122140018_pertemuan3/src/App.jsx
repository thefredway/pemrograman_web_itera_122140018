import { BookProvider } from "./context/BookContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BookProvider>
      <Router>
        <Navbar />
        <main className="container is-fluid py-4" style={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </BookProvider>
  );
}

export default App;
