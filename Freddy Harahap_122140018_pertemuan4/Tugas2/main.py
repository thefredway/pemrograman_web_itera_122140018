#Membuat Program Pengelolaan Data Nilai Mahasiswa
from tabulate import tabulate

def hitung_nilai_akhir(nilai_uts, nilai_uas, nilai_tugas):
    return (0.3 * nilai_uts) + (0.4 * nilai_uas) + (0.3 * nilai_tugas)  

def grade(nilai_akhir):
    if nilai_akhir >= 80:
        return "A"
    elif 70 <= nilai_akhir < 80:
        return "B"
    elif 60 <= nilai_akhir < 70:
        return "C"
    elif 50 <= nilai_akhir < 60:
        return "D"
    else:        
        return "E"

def mencari_nilai(data_mahasiswa):
    nilai_tertinggi = max(m["nilai_akhir"] for m in data_mahasiswa)
    nilai_terendah = min(m["nilai_akhir"] for m in data_mahasiswa)
    return nilai_tertinggi, nilai_terendah

def mengambil_nama(data_mahasiswa, nilai_tertinggi, nilai_terendah):
    nama_tertinggi = ""
    nama_terendah = ""
    for m in data_mahasiswa:
        if m["nilai_akhir"] == nilai_tertinggi:
            nama_tertinggi = m["nama"]
        if m["nilai_akhir"] == nilai_terendah:
            nama_terendah = m["nama"]
    return nama_tertinggi, nama_terendah    

data_mahasiswa = [
    {"nama": "Budi", "nim": "122140001", "nilai_uts": 78, "nilai_uas": 82, "nilai_tugas": 75},
    {"nama": "Siti", "nim": "122140002", "nilai_uts": 88, "nilai_uas": 91, "nilai_tugas": 84},
    {"nama": "Rina", "nim": "122140003", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 68},
    {"nama": "Agus", "nim": "122140004", "nilai_uts": 92, "nilai_uas": 87, "nilai_tugas": 90},
    {"nama": "Dewi", "nim": "122140005", "nilai_uts": 74, "nilai_uas": 79, "nilai_tugas": 77}
]

if __name__ == "__main__":
    for mahasiswa in data_mahasiswa:
        nilai_akhir = hitung_nilai_akhir(mahasiswa["nilai_uts"], mahasiswa["nilai_uas"], mahasiswa["nilai_tugas"])
        mahasiswa["nilai_akhir"] = nilai_akhir
        mahasiswa["grade"] = grade(nilai_akhir)

    print(tabulate(
        [
            [m["nama"], m["nim"], m["nilai_uts"], m["nilai_uas"], m["nilai_tugas"], m["nilai_akhir"], m["grade"]]
            for m in data_mahasiswa
        ],
        headers=["Nama", "NIM", "Nilai UTS", "Nilai UAS", "Nilai Tugas", "Nilai Akhir", "Grade"],
        tablefmt="grid"
    ))

    nilai_tertinggi, nilai_terendah = mencari_nilai(data_mahasiswa)
    nama_tertinggi, nama_terendah = mengambil_nama(data_mahasiswa, nilai_tertinggi, nilai_terendah)

    print(f"Mahasiswa dengan nilai akhir tertinggi: {nama_tertinggi}")
    print(f"Mahasiswa dengan nilai akhir terendah: {nama_terendah}")
