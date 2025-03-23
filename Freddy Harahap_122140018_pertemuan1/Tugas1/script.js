// Tugas 1: Aplikasi To-Do List Sederhana

document.addEventListener("DOMContentLoaded", function () {
    let inputTugas = document.getElementById("input-tugas");
    let tombolSimpan = document.getElementById("tombol-simpan");
    let listTugas = document.getElementById("list");
    let listSelesai = document.getElementById("list-selesai");

    function memuatTugas() {
        const tugas = JSON.parse(localStorage.getItem("tugas")) || [];
        const tugasSelesai = JSON.parse(localStorage.getItem("tugasSelesai")) || [];

        tugas.forEach(tugas => menambahTugasToDOM(tugas, false));
        tugasSelesai.forEach(tugas => menambahTugasToDOM(tugas, true));
    }

    function menambahTugasToDOM(tugas, isCompleted) {
        let itemBaru = document.createElement("li");
        itemBaru.className = "flex items-center justify-between p-2 bg-white border rounded";

        let teksTugas = document.createElement("span");
        teksTugas.innerText = tugas;

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "mr-2";
        checkbox.checked = isCompleted;

        let tombolHapus = document.createElement("button");
        tombolHapus.innerHTML = "🗑️";
        tombolHapus.className = "text-red-500 ml-2 transition-transform transform hover:scale-125 hover:text-red-700";

        tombolHapus.addEventListener("mouseenter", function () {
            tombolHapus.innerHTML = "❌";
        });
        tombolHapus.addEventListener("mouseleave", function () {
            tombolHapus.innerHTML = "🗑️";
        });

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                listSelesai.appendChild(itemBaru);
                teksTugas.classList.add("line-through", "text-gray-500");
            } else {
                listTugas.appendChild(itemBaru);
                teksTugas.classList.remove("line-through", "text-gray-500");
            }
            simpanTugas();
        });

        tombolHapus.addEventListener("click", function () {
            itemBaru.remove();
            simpanTugas();
        });

        let itemWrapper = document.createElement("div");
        itemWrapper.className = "flex items-center";
        itemWrapper.appendChild(checkbox);
        itemWrapper.appendChild(teksTugas);

        itemBaru.appendChild(itemWrapper);
        itemBaru.appendChild(tombolHapus);

        if (isCompleted) {
            teksTugas.classList.add("line-through", "text-gray-500");
            listSelesai.appendChild(itemBaru);
        } else {
            listTugas.appendChild(itemBaru);
        }
    }

    function simpanTugas() {
        const tugasArray = [];
        const tugasSelesaiArray = [];

        listTugas.querySelectorAll("span").forEach(tugas => {
            tugasArray.push(tugas.innerText);
        });

        listSelesai.querySelectorAll("span").forEach(tugas => {
            tugasSelesaiArray.push(tugas.innerText);
        });

        localStorage.setItem("tugas", JSON.stringify(tugasArray));
        localStorage.setItem("tugasSelesai", JSON.stringify(tugasSelesaiArray));
    }

    tombolSimpan.addEventListener("click", function () {
        let tugas = inputTugas.value.trim();
        if (tugas === "") return;

        menambahTugasToDOM(tugas, false);
        simpanTugas();

        inputTugas.value = "";
    });
    
    memuatTugas();
});
