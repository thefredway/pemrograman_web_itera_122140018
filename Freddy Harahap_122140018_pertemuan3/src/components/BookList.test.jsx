import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import BookList from "./BookList";
import { BookProvider } from "../context/BookContext";

// Ini data dummy buat kebutuhan testing komponen BookList
const mockBooks = [
  {
    id: 1,
    title: "Buku Pertama",
    author: "Penulis A",
    status: "owned",
    rating: 0,
  },
  {
    id: 2,
    title: "Buku Kedua",
    author: "Penulis B",
    status: "reading",
    rating: 4,
  },
  {
    id: 3,
    title: "Buku Ketiga",
    author: "Penulis C",
    status: "wishlist",
    rating: 0,
  },
];

describe("BookList Component", () => {
  // Test ini ngecek kalau daftar buku kosong, harus muncul pesan "tidak ada buku ditemukan"
  test("shows empty message when no books", () => {
    render(
      <BookProvider>
        <BookList setEditBook={() => {}} />
      </BookProvider>
    );
    // Kalau test ini gagal, kemungkinan karena komponen BookList tidak nge-handle kondisi kosong
    expect(screen.getByText(/tidak ada buku ditemukan/i)).toBeInTheDocument();
  });

  // Test buat cek apakah semua buku dari mockBooks ditampilkan
  test("displays list of books correctly", () => {
    render(
      <BookProvider initialBooks={mockBooks}>
        <BookList setEditBook={() => {}} />
      </BookProvider>
    );

    // Debug: Kalau salah satu judul gak muncul, kemungkinan ada kesalahan mapping data atau komponen render-nya conditional
    expect(screen.getByText("Buku Pertama")).toBeInTheDocument();
    expect(screen.getByText("Buku Kedua")).toBeInTheDocument();
    expect(screen.getByText("Buku Ketiga")).toBeInTheDocument();
  });

  // Test buat cek fitur filter berdasarkan status (misalnya: reading)
  test("filters books by status", () => {
    render(
      <BookProvider initialBooks={mockBooks}>
        <BookList setEditBook={() => {}} />
      </BookProvider>
    );

    const filterSelect = screen.getByRole("combobox");
    fireEvent.change(filterSelect, { target: { value: "reading" } });

    // Debug: Kalau filtering gak jalan, kemungkinan state filter atau value combobox-nya tidak tersambung ke fungsi filter
    expect(screen.queryByText("Buku Pertama")).not.toBeInTheDocument();
    expect(screen.getByText("Buku Kedua")).toBeInTheDocument();
    expect(screen.queryByText("Buku Ketiga")).not.toBeInTheDocument();
  });

  // Test fitur pencarian buku berdasarkan judul/penulis
  test("searches books by title/author", () => {
    render(
      <BookProvider initialBooks={mockBooks}>
        <BookList setEditBook={() => {}} />
      </BookProvider>
    );

    const searchInput = screen.getByPlaceholderText("Cari buku...");
    fireEvent.change(searchInput, { target: { value: "kedua" } });

    // Debug: Kalau buku yang dicari gak muncul, pastikan fungsi filter/search jalan tiap input berubah
    expect(screen.queryByText("Buku Pertama")).not.toBeInTheDocument();
    expect(screen.getByText("Buku Kedua")).toBeInTheDocument();
    expect(screen.queryByText("Buku Ketiga")).not.toBeInTheDocument();
  });

  // Test ini memastikan rating (bintang) cuma muncul di buku dengan status 'reading'
  test("shows rating only for books with reading status", () => {
    render(
      <BookProvider initialBooks={mockBooks}>
        <BookList setEditBook={() => {}} />
      </BookProvider>
    );

    const ratingStars = screen.getAllByLabelText(/star/i);
    expect(ratingStars).toHaveLength(4); // Harusnya ada 4 bintang karena hanya "Buku Kedua" yang sedang dibaca
  });

  // Test buat fitur tombol edit (delete bisa ditambahkan juga nanti)
  test("edit and delete buttons work", () => {
    const mockSetEditBook = vi.fn(); // vi.fn() ini buat ngecek apakah fungsi dipanggil

    render(
      <BookProvider initialBooks={[mockBooks[0]]}>
        <BookList setEditBook={mockSetEditBook} />
      </BookProvider>
    );

    fireEvent.click(screen.getByText("Edit")); // Simulasi klik tombol edit
    expect(mockSetEditBook).toHaveBeenCalledWith(mockBooks[0]); // Memastikan fungsi dipanggil dengan data buku yang benar
  });
});
