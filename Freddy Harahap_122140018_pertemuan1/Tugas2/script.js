// Tugas 2 : Kalkulator Sederhana

function hitungKalkulator(angka1, angka2, operasi) {
    let hasil = 0;
    switch (operasi) {
        case "tambah":
            hasil = angka1 + angka2;
            break;
        case "kurang":
            hasil = angka1 - angka2;
            break;
        case "kali":
            hasil = angka1 * angka2;
            break;
        case "bagi":
            if (angka2 === 0) {
                return "Error: Pembagian dengan nol tidak diperbolehkan";
            }
            hasil = angka1 / angka2;
            break;
        case "pangkat":
            hasil = Math.pow(angka1, angka2);
            break;
        case "mod":
            if (angka2 === 0) {
                return "Error: Modulus dengan nol tidak diperbolehkan";
            }
            hasil = angka1 % angka2;
            break;
        case "root":
            if (angka1 < 0) {
                return "Error: Tidak bisa menghitung akar kuadrat dari angka negatif!";
            }
            hasil = Math.sqrt(angka1);
            break;
        case "exp":
            hasil = Math.exp(angka1);
            break;
        case "faktorial":
            if (angka1 < 0) {
                return "Error: Tidak bisa menghitung faktorial dari angka negatif!";
            } else if (angka1 % 1 !== 0) {
                return "Error: Tidak bisa menghitung faktorial dari angka desimal!";
            } else {
                hasil = 1;
                for (let i = 1; i <= angka1; i++) {
                    hasil *= i;
                }
            }
            break;
        default:
            return "Operasi tidak valid";
    }
    return hasil;
}

function handleButtonClick(operasi) {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
    let hasil;

    if (isNaN(angka1)) {
        document.getElementById("hasil-kalkulator").innerHTML =
            `<p class="text-red-500">Masukkan angka pertama yang valid!</p>`;
        return;
    }

    if (operasi === "root") {
        hasil = hitungKalkulator(angka1, 0, operasi);
        document.getElementById("hasil-kalkulator").innerHTML =  `<p>Hasil: √${angka1} = ${hasil}</p>`;
    } else if (operasi === "exp"){
        hasil = hitungKalkulator(angka1, 0, operasi);
        document.getElementById("hasil-kalkulator").innerHTML = `<p>Hasil: e^${angka1} = ${hasil}</p>`;
    }
    else if (operasi === "faktorial"){
        hasil = hitungKalkulator(angka1, 0, operasi);
        document.getElementById("hasil-kalkulator").innerHTML = `<p>Hasil: ${angka1}! = ${hasil}</p>`;
    } else {
        if (isNaN(angka2)) {
            document.getElementById("hasil-kalkulator").innerHTML =
                `<p class="text-red-500">Masukkan angka kedua yang valid!</p>`;
            return;
        }
        
        hasil = hitungKalkulator(angka1, angka2, operasi);
        const simbol = {
            "tambah": "+",
            "kurang": "-",
            "kali": "×",
            "bagi": "÷",
            "pangkat": "^",
            "mod": "%",
        }[operasi] || "?";

        document.getElementById("hasil-kalkulator").innerHTML =
            `<p>Hasil: ${angka1} ${simbol} ${angka2} = ${hasil}</p>`;
    }
}

// Event handler untuk tombol operasi
document.getElementById("btn-tambah").addEventListener("click", () => handleButtonClick("tambah"));
document.getElementById("btn-kurang").addEventListener("click", () => handleButtonClick("kurang"));
document.getElementById("btn-kali").addEventListener("click", () => handleButtonClick("kali"));
document.getElementById("btn-bagi").addEventListener("click", () => handleButtonClick("bagi"));
document.getElementById("btn-pangkat").addEventListener("click", () => handleButtonClick("pangkat"));
document.getElementById("btn-mod").addEventListener("click", () => handleButtonClick("mod"));
document.getElementById("btn-root").addEventListener("click", () => handleButtonClick("root"));
document.getElementById("btn-exp").addEventListener("click", () => handleButtonClick("exp"));
document.getElementById("btn-faktorial").addEventListener("click", () => handleButtonClick("faktorial"));