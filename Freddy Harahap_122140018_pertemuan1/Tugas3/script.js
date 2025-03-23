// Tugas 3 : Validasi Form Input

document.getElementById("submit").addEventListener("click", function() {
    event.preventDefault();
    validasiForm();

});

function validasiForm() {
    let nama = document.getElementById("nama").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let isValid = true;

    document.getElementById("error-nama").innerHTML = "";
    document.getElementById("error-email").innerHTML = "";
    document.getElementById("error-password").innerHTML = "";

    if (nama.length <= 3) {
        document.getElementById("error-nama").innerHTML = 
            '<p class="text-red-500 text-sm">Nama harus lebih dari 3 karakter</p>';
        isValid = false;
    }

    let emailPattern = /@.+\./;
    if (!emailPattern.test(email)) {
        document.getElementById("error-email").innerHTML = 
            '<p class="text-red-500 text-sm">Email harus valid</p>';
        isValid = false;
    }

    if (password.length < 8) {
        document.getElementById("error-password").innerHTML = 
            '<p class="text-red-500 text-sm">Password harus minimal 8 karakter</p>';
        isValid = false;
    }
    
    if (isValid) {
        alert("Form Valid!");
        
    }
}