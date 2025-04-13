# Membuat Personal Dashboard bertema Lock In
## Deskripsi  
Dashboard ini dibuat sesuai dengan kebutuhan mahasiswa seperti saya sebagai bahan motivasi dan untuk menegaskan produktivitas.  
Dashboard ini dilengkap dengan fitur:  
1. Video motivasi
2. Tampilan waktu dan cuaca secara real-time
3. Manajemen jadwal kuliah
   - Bisa memasukkan jadwal perkuliahan, melihat jadwal hari ini atau mingguan.
4. Pomodoro timer
   - Bisa menggunakan pomdoro 25/5 atau 50/10 dengan ada statistik hari ini yaitu total sesi dan total waktu fokus.
5. Manajemen tugas
   - Bisa melakukan tambah/edit/hapus tugas.
   - Bisa juga melakukan filter berdasarkan mata kuliah, deadline, dan status.
6. Catatan cepat
   - Berfugnsi untuk membantu refleksi harian yang hanya akan tersimpan pada hari itu saja.
## Screenshot
![Screenshot 2025-04-13 113426](https://github.com/user-attachments/assets/9fb632a2-c7d4-4e20-b34d-dbb41aac053f)
![Screenshot 2025-04-13 113446](https://github.com/user-attachments/assets/87beda65-81a6-4d00-a2a0-e11c11bbd503)
![Screenshot 2025-04-13 113621](https://github.com/user-attachments/assets/2edabb0b-1f03-403e-b9b3-1e980f7b52a7)
![Screenshot 2025-04-13 113735](https://github.com/user-attachments/assets/a425ede2-af39-4a14-a5de-a528cc38b351)

## Fitur ES6+ yang diimplementasikan
1. Classes
   - Menggunakan classes Dashboard dalam script.js, serta menggunakan constructor() dan method().
2. Arrow functions
   - Semua fungsi menggunakan penulisan baru bukan tradisional contohnya terdapat di method class Dashboard.
3. Template Literals
   - Penggunaan backticks.
4. Async/Await
   - Penggunaan async() dalam fungsi loadWwather yang menggunakan API dari openweather.map.
5. Destructuring Assignment
   - Menggunakan destructuring pada parameter object dan array.
6. Spread Operator
   - Menggunakan ... untuk mempercepat penulisan dalam menghubungkan array.
7. Default Parameters
   - Penggunaan default parameter dalam fungsi.
8. Object Property Shorthand
    - Terdapat const task = { .. } dalam method handleTaskSubmit().
9. Variabel let dan const
    - Penggunaan let untuk mutable variable dan const untuk immutable variable.
