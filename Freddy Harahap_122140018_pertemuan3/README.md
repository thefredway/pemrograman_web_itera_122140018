# Aplikasi Manajemen Buku Pribadi

## Deskripsi Aplikasi

Aplikasi manajemen buku sederhana untuk manage:

- Buku yang sudah dimiliki
- Buku yang sedang dibaca
- Buku yang ingin dibeli

Fitur Utama:

- CRUD (Create, Read, Update, Delete) buku
- Filter berdasarkan status buku (sudah dimiliki, sedang dibaca, dan ingin dibeli)
- Pencarian buku
- Rating buku (hanya untuk yang sedang dibaca)
- Statistik koleksi buku
- Penyimpanan lokal (localStorage)

## Teknologi

- React.js + Vite
- Bulma CSS Framework
- React Router
- React Icons
- React Testing Library (Vitest)

## How To Run

### Requirements

- Node.js (v22+)
- npm/yarn

### Langkah-langkah:

1. Clone repository:

```
   s
```

2. Install dependencies:

```
npm install
```

3. Jalankan:

```
npm run dev
```

4. Jika ingin testing:

```
npm test
```

## Screenshot

## Fitur React yang digunakan

1. React Hooks (useState dan useEffect seperti untuk load data dari localStorage)
2. Context API (seperti dalam BookContext)
3. React Router (seperti dalam App.jsx)
4. Custom Hooks (ada useLocalStorage.jsx dan useBookStats.jsx)

## Laporan Testing

Berdasarkant 11 unit test yang telah dibuat, hasil menunjukkan 5 success dan 5 failed dengan lampiran yang tersedia dalam folder hasil_test
