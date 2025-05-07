from libraryitem import *

# Fungsi untuk menampilkan menu
def tampilkan_menu():
    print("\nTabik pun!\nSelamat datang di Sistem Manajemen Perpustakaan ITERA")
    print("1. Tambah Item Baru")
    print("2. Tampilkan Semua Item")
    print("3. Cari Item Berdasarkan Judul")
    print("4. Cari Item Berdasarkan ID")
    print("5. Pinjam Item")
    print("6. Kembalikan Item")
    print("7. Keluar")

# Fungsi untuk meminjam item
def pinjam_item(perpustakaan):
    id_item = input("Masukkan ID item yang ingin dipinjam: ")
    item = perpustakaan.cari_id(id_item)
    if item:
        if item.tersedia:
            item.tersedia = False
            print(f"Kamu meminjam {item.jenis()} '{item._judul}'")
        else:
            print(f"Waduh, {item.jenis()} '{item._judul}' sedang dipinjam")

# Fungsi untuk mengembalikan item
def kembalikan_item(perpustakaan):
    id_item = input("Masukkan ID item yang ingin dikembalikan: ")
    item = perpustakaan.cari_id(id_item)
    if item:
        if not item.tersedia:
            item.tersedia = True
            print(f"Terima kasih telah mengembalikan {item.jenis()} '{item._judul}'")
        else:
            print(f"{item.jenis()} '{item._judul}' sudah tersedia di perpustakaan")

# Program utama
if __name__ == "__main__":
    perpustakaan = Perpustakaan()
    
    # Menambahkan contoh data
    perpustakaan.tambah_item(Buku("B001", "The Alchemist", "Paulo Coelho", 350))
    perpustakaan.tambah_item(Majalah("M001", "Bobo", 256, "Blink Publisher"))
    perpustakaan.tambah_item(Skripsi("S001", "Sistem Informasi Waterfall", "Budi Budiman", 2022))
    perpustakaan.tambah_item(Jurnal("J001", "Jurnal Keamanan Siber", 12, "1234-5678"))
    
    while True:
        tampilkan_menu()
        pilihan = input("Pilih menu (1-7): ")
        
        if pilihan == "1":
            print("\nTambah Item Baru")
            print("1. Buku")
            print("2. Majalah")
            print("3. Skripsi")
            print("4. Jurnal")
            jenis = input("Pilih jenis item (1-4): ")
            
            id_item = input("Masukkan ID: ")
            judul = input("Masukkan judul: ")
            
            if jenis == "1":
                pengarang = input("Masukkan pengarang: ")
                halaman = int(input("Masukkan jumlah halaman: "))
                perpustakaan.tambah_item(Buku(id_item, judul, pengarang, halaman))
            elif jenis == "2":
                edisi = int(input("Masukkan nomor edisi: "))
                penerbit = input("Masukkan penerbit: ")
                perpustakaan.tambah_item(Majalah(id_item, judul, edisi, penerbit))
            elif jenis == "3":
                penulis = input("Masukkan penulis: ")
                tahun = int(input("Masukkan tahun: "))
                perpustakaan.tambah_item(Skripsi(id_item, judul, penulis, tahun))
            elif jenis == "4":
                volume = int(input("Masukkan volume: "))
                issn = input("Masukkan ISSN: ")
                perpustakaan.tambah_item(Jurnal(id_item, judul, volume, issn))
            else:
                print("Pilihan tidak valid!")
        
        elif pilihan == "2":
            perpustakaan.tampilkan_semua()
        
        elif pilihan == "3":
            judul = input("Masukkan judul yang dicari: ")
            perpustakaan.cari_judul(judul)
        
        elif pilihan == "4":
            id_item = input("Masukkan ID yang dicari: ")
            item = perpustakaan.cari_id(id_item)
            if item:
                print("\nHasil pencarian:")
                item.tampilkan_info()
            else:
                print("Item tidak ditemukan!")
        
        elif pilihan == "5":
            pinjam_item(perpustakaan)
        
        elif pilihan == "6":
            kembalikan_item(perpustakaan)
        
        elif pilihan == "7":
            print("Terima kasih telah menggunakan sistem perpustakaan ITERA!")
            break
        
        else:
            print("Pilihan tidak valid! Silakan pilih 1-7.")