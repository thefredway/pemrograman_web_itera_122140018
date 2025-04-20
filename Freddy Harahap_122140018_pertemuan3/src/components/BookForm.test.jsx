import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BookForm from "./BookForm";
import { BookProvider } from "../context/BookContext";

describe("BookForm component", () => {
  // Test 1: Cek apakah elemen form dasar muncul
  test("renders basic form elements", () => {
    render(
      <BookProvider>
        <BookForm />
      </BookProvider>
    );

    // Debug: Kalau label gak ketemu, pastikan komponen pakai label htmlFor yang sesuai dan teksnya sesuai regex
    expect(screen.getByLabelText(/judul buku/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/penulis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByText(/tambah buku/i)).toBeInTheDocument();
  });

  // Test 2: Rating tidak muncul saat status bukan "reading"
  test("does not show rating when status is not reading", () => {
    render(
      <BookProvider>
        <BookForm />
      </BookProvider>
    );

    const statusSelect = screen.getByLabelText(/status/i);
    fireEvent.change(statusSelect, {
      target: { value: "owned" }, // status bukan "reading"
    });

    // Debug: Kalau rating tetap muncul, berarti kondisi untuk menampilkan rating di komponen perlu dicek lagi
    expect(screen.queryByText(/rating/i)).not.toBeInTheDocument();
  });

  // Test 3: Rating muncul kalau status = reading
  test("shows rating when status is reading", () => {
    render(
      <BookProvider>
        <BookForm />
      </BookProvider>
    );

    const statusSelect = screen.getByLabelText(/status/i);
    fireEvent.change(statusSelect, {
      target: { value: "reading" },
    });

    // Debug: Pastikan teks "rating" memang ada di komponen saat status "reading"
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
  });

  // Test 4: Mode edit akan ubah tombol jadi "Update Buku"
  test("shows update button when in edit mode", () => {
    const mockBook = {
      id: 1,
      title: "Test Book",
      author: "Test Author",
      status: "reading",
      rating: 3,
    };

    render(
      <BookProvider>
        <BookForm editBook={mockBook} setEditBook={() => {}} />
      </BookProvider>
    );

    // Debug: Kalau tetap "Tambah Buku", mungkin prop `editBook` tidak diterima/di-handle dengan benar
    expect(screen.getByText(/update buku/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

  // Test 5: Bisa isi form dan klik submit
  test("can fill form and submit", () => {
    render(
      <BookProvider>
        <BookForm />
      </BookProvider>
    );

    // Isi input judul buku
    fireEvent.change(screen.getByLabelText(/judul buku/i), {
      target: { value: "New Book" },
    });

    // Isi input penulis
    fireEvent.change(screen.getByLabelText(/penulis/i), {
      target: { value: "New Author" },
    });

    // Ganti status ke "reading" supaya rating muncul
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: "reading" },
    });

    // Klik salah satu bintang rating (misalnya bintang ke-4)
    // Pastikan komponen rating pakai aria-label seperti "star-1", "star-2", dst.
    const stars = screen.getAllByLabelText(/star-\d/i);
    fireEvent.click(stars[3]); // kasih rating 4

    // Klik tombol submit
    fireEvent.click(screen.getByText(/tambah buku/i));

    // Debug: Untuk verifikasi lebih lanjut, bisa tambahin spy/mock pada context handler-nya
  });
});
