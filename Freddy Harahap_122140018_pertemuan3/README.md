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

1. Clone repository (clone repository ini dan masuk ke folder Freddy Harahap_122140018_pertemuan3:

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
![Screenshot 2025-04-20 234134](https://github.com/user-attachments/assets/92fc1e30-b45b-4733-afdd-0c948210fa85)
![Screenshot 2025-04-20 234142](https://github.com/user-attachments/assets/dc9cad30-e0b5-46aa-b19f-8d25f253d816)
![Screenshot 2025-04-20 234156](https://github.com/user-attachments/assets/c500f24f-ffb1-4f61-ab44-a8c92e5b9535)
![Screenshot 2025-04-20 234208](https://github.com/user-attachments/assets/0847f63d-7b03-4765-ae66-ae0486361fca)

## Fitur React yang digunakan

1. React Hooks (useState dan useEffect seperti untuk load data dari localStorage)
2. Context API (seperti dalam BookContext)
3. React Router (seperti dalam App.jsx)
4. Custom Hooks (ada useLocalStorage.jsx dan useBookStats.jsx)

## Laporan Testing

Berdasarkant 11 unit test yang telah dibuat, hasil menunjukkan 5 success dan 5 failed dengan lampiran yang tersedia dalam folder hasil_test
