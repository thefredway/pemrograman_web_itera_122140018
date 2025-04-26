# Import modul math_operations.py dan menggunakan seluruh fungsinya
from math_operations import OperasiGeometri
import math_operations as mo

import random

def angka_random():
    return random.randint(1, 10)

geo = OperasiGeometri()
suhu = mo.OperasiSuhu()

print("=== Geometri ===")
print(f"Luas Persegi: {geo.luas_persegi(angka_random())}")
print(f"Keliling Persegi: {geo.keliling_persegi(angka_random())}")
print(f"Luas Lingkaran: {geo.luas_lingkaran(angka_random()):.2f}")
print(f"Keliling Lingkaran: {geo.keliling_lingkaran(angka_random()):.2f}")
print(f"Luas Segitiga: {geo.luas_segitiga(angka_random(), angka_random())}")
print(f"Keliling Segitiga: {geo.keliling_segitiga(angka_random(), angka_random(), angka_random())}")
print(f"Luas Persegi Panjang: {geo.luas_persegi_panjang(angka_random(), angka_random())}")
print(f"Keliling Persegi Panjang: {geo.keliling_persegi_panjang(angka_random(), angka_random())}")

print("\n=== Suhu ===")
print(f"30°C ke Fahrenheit: {suhu.celsius_to_fahrenheit(30):.2f}°F")
print(f"48°F ke Celsius: {suhu.fahrenheit_to_celsius(48):.2f}°C")
print(f"34°C ke Kelvin: {suhu.celsius_to_kelvin(34):.2f}K")
print(f"300K ke Celsius: {suhu.kelvin_to_celsius(300):.2f}°C")

print("\n=== Konstanta ===")
print(f"Nilai PI: {geo.pi}")