from abc import ABC, abstractmethod

# Abstract class sebagai dasar untuk semua item perpustakaan
class LibraryItem(ABC):
    def __init__(self, id_item, judul):
        """Inisialisasi item perpustakaan dasar"""
        self._id_item = id_item  # protected
        self._judul = judul      # protected 
        self.__tersedia = True   # private 
    
    @property
    def id_item(self):
        """Getter untuk ID item"""
        return self._id_item
    
    @id_item.setter
    def id_item(self, nilai):
        """Setter untuk ID item dengan validasi"""
        if not nilai:
            raise ValueError("ID tidak boleh kosong")
        self._id_item = nilai
    
    @property
    def tersedia(self):
        """Getter untuk status ketersediaan"""
        return self.__tersedia
    
    @tersedia.setter
    def tersedia(self, status):
        """Setter untuk status ketersediaan"""
        self.__tersedia = status
    
    @abstractmethod
    def tampilkan_info(self):
        """Menampilkan informasi item (harus diimplementasikan subclass)"""
        pass
    
    @abstractmethod
    def jenis(self):
        """Mengembalikan jenis item (harus diimplementasikan subclass)"""
        pass


# Subclass Buku
class Buku(LibraryItem):
    def __init__(self, id_item, judul, pengarang, halaman):
        """Inisialisasi buku"""
        super().__init__(id_item, judul)
        self.__pengarang = pengarang  # private
        self.__halaman = halaman      # private 
    
    @property
    def pengarang(self):
        """Getter untuk pengarang"""
        return self.__pengarang
    
    def tampilkan_info(self):
        """Menampilkan informasi buku"""
        print(f"Buku: {self._judul}")
        print(f"ID: {self._id_item}")
        print(f"Pengarang: {self.__pengarang}")
        print(f"Halaman: {self.__halaman}")
        print(f"Status: {'Tersedia' if self.tersedia else 'Dipinjam'}")
        print("-" * 30)
    
    def jenis(self):
        """Mengembalikan jenis item"""
        return "Buku"


# Subclass Majalah
class Majalah(LibraryItem):
    def __init__(self, id_item, judul, edisi, penerbit):
        """Inisialisasi majalah"""
        super().__init__(id_item, judul)
        self.__edisi = edisi      # private
        self.__penerbit = penerbit # private
    
    @property
    def edisi(self):
        """Getter untuk edisi majalah"""
        return self.__edisi
    
    def tampilkan_info(self):
        """Menampilkan informasi majalah"""
        print(f"Majalah: {self._judul}")
        print(f"ID: {self._id_item}")
        print(f"Penerbit: {self.__penerbit}")
        print(f"Edisi: {self.__edisi}")
        print(f"Status: {'Tersedia' if self.tersedia else 'Dipinjam'}")
        print("-" * 30)
    
    def jenis(self):
        """Mengembalikan jenis item"""
        return "Majalah"


# Subclass Skripsi
class Skripsi(LibraryItem):
    def __init__(self, id_item, judul, penulis, tahun):
        """Inisialisasi skripsi"""
        super().__init__(id_item, judul)
        self.__penulis = penulis  # private
        self.__tahun = tahun      # private
    
    @property
    def tahun(self):
        """Getter untuk tahun skripsi"""
        return self.__tahun
    
    def tampilkan_info(self):
        """Menampilkan informasi skripsi"""
        print(f"Skripsi: {self._judul}")
        print(f"ID: {self._id_item}")
        print(f"Penulis: {self.__penulis}")
        print(f"Tahun: {self.__tahun}")
        print(f"Status: {'Tersedia' if self.tersedia else 'Dipinjam'}")
        print("-" * 30)
    
    def jenis(self):
        """Mengembalikan jenis item"""
        return "Skripsi"


# Subclass Jurnal
class Jurnal(LibraryItem):
    def __init__(self, id_item, judul, volume, issn):
        """Inisialisasi jurnal"""
        super().__init__(id_item, judul)
        self.__volume = volume  # private 
        self.__issn = issn      # private 
    
    @property
    def issn(self):
        """Getter untuk ISSN jurnal"""
        return self.__issn
    
    def tampilkan_info(self):
        """Menampilkan informasi jurnal"""
        print(f"Jurnal: {self._judul}")
        print(f"ID: {self._id_item}")
        print(f"Volume: {self.__volume}")
        print(f"ISSN: {self.__issn}")
        print(f"Status: {'Tersedia' if self.tersedia else 'Dipinjam'}")
        print("-" * 30)
    
    def jenis(self):
        """Mengembalikan jenis item"""
        return "Jurnal"


# Class untuk mengelola perpustakaan
class Perpustakaan:
    def __init__(self):
        """Inisialisasi perpustakaan dengan koleksi kosong"""
        self.__koleksi = {}  # private
    
    def tambah_item(self, item):
        """Menambahkan item baru ke perpustakaan"""
        if item.id_item in self.__koleksi:
            print(f"Item dengan ID {item.id_item} sudah ada")
        else:
            self.__koleksi[item.id_item] = item
            print(f"{item.jenis()} '{item._judul}' ditambahkan")
    
    def tampilkan_semua(self):
        """Menampilkan semua item di perpustakaan"""
        if not self.__koleksi:
            print("Perpustakaan kosong")
            return
        
        print("\nDaftar Koleksi Perpustakaan:")
        for item in self.__koleksi.values():
            item.tampilkan_info()
    
    def cari_judul(self, judul):
        """Mencari item berdasarkan judul"""
        hasil = []
        for item in self.__koleksi.values():
            if judul.lower() in item._judul.lower():
                hasil.append(item)
        
        if hasil:
            print(f"\nHasil pencarian '{judul}':")
            for item in hasil:
                item.tampilkan_info()
        else:
            print(f"Tidak ditemukan item dengan judul '{judul}'")
    
    def cari_id(self, id_item):
        """Mencari item berdasarkan ID"""
        return self.__koleksi.get(id_item) 