#Membuat modul math_operations.py
from abc import ABC

PI = 3.14159

class OperasiGeometri(ABC):
    def __init__(self):
        self.pi = PI

    def luas_persegi(self, sisi):
        return sisi * sisi

    def keliling_persegi(self, sisi):
        return 4 * sisi

    def luas_lingkaran(self, radius):
        return self.pi * radius * radius

    def keliling_lingkaran(self, radius):
        return 2 * self.pi * radius

    def luas_segitiga(self, alas, tinggi):
        return 0.5 * alas * tinggi

    def keliling_segitiga(self, sisi1, sisi2, sisi3):
        return sisi1 + sisi2 + sisi3

    def luas_persegi_panjang(self, panjang, lebar):
        return panjang * lebar

    def keliling_persegi_panjang(self, panjang, lebar):
        return 2 * (panjang + lebar)

class OperasiSuhu(ABC):
    def celsius_to_fahrenheit(self, celsius):
        return (celsius * 9/5) + 32

    def fahrenheit_to_celsius(self, fahrenheit):
        return (fahrenheit - 32) * 5/9

    def celsius_to_kelvin(self, celsius):
        return celsius + 273.15

    def kelvin_to_celsius(self, kelvin):
        return kelvin - 273.15
