# Membuat program penghitung BMI (Body Mass Index) sederhana

def hitung_bmi(berat_badan, tinggi_badan):
    bmi = berat_badan / (tinggi_badan ** 2)
    return bmi

def kategori_bmi(bmi):
    if bmi < 18.5:
        return "Berat badan kurang"
    elif 18.5 <= bmi < 25:
        return "Berat badan normal"
    elif 25 <= bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"

if __name__ == "__main__":
    try:
        berat_badan = float(input("Masukkan berat badan (satuan kg): "))
        tinggi_badan = float(input("Masukkan tinggi badan (satuan m): "))

        if berat_badan <= 0 or tinggi_badan <= 0:
            raise ValueError("Berat badan dan tinggi badan harus lebih besar dari 0.")

        bmi = hitung_bmi(berat_badan, tinggi_badan)
        kategori = kategori_bmi(bmi)

        print(f"Nilai BMI: {bmi:.2f}")
        print(f"Kategori BMI: {kategori}")

    except ValueError as e:
        print(f"Input tidak valid: {e}")
    except ZeroDivisionError:
        print("Tinggi badan tidak boleh nol.")