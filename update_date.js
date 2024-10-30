// DOM Elements
const dayInput = document.getElementById("day");
const confirmButton = document.getElementById("confirm");
const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");

// Validation Functions
function validatePhone(phone) {
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    return phoneRegex.test(phone);
}

function validateName(name) {
    return name.length >= 3 && /^[a-zA-Z\s]*$/.test(name);
}

function validateTime(fromTime, toTime) {
    return fromTime < toTime;
}

// Alert Functions
function showErrorAlert(message) {
    Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
        confirmButtonText: "OK"
    });
}

function showConfirmationAlert(userData) {
    Swal.fire({
        title: "Konfirmasi Pembelian",
        text: "Apakah Anda yakin ingin melakukan pembelian?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem("userData", JSON.stringify(userData));
            window.location.replace("/NICHENIQUE/confirm_order.html");
        }
    });
}

// Format Price Function
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Event Listeners
dayInput.addEventListener("change", () => {
    console.log("Selected date:", dayInput.value);
});

confirmButton.addEventListener("click", () => {
    // Get all input values
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const fromTime = fromInput.value;
    const toTime = toInput.value;
    const selectedDate = dayInput.value;

    // Validation checks
    if (!name) {
        showErrorAlert("Mohon masukkan nama Anda");
        return;
    }

    if (!validateName(name)) {
        showErrorAlert("Nama hanya boleh mengandung huruf dan minimal 3 karakter");
        return;
    }

    if (!phone) {
        showErrorAlert("Mohon masukkan nomor telepon Anda");
        return;
    }

    if (!validatePhone(phone)) {
        showErrorAlert("Mohon masukkan nomor telepon Indonesia yang valid");
        return;
    }

    if (!validateTime(fromTime, toTime)) {
        showErrorAlert("Waktu mulai harus sebelum waktu selesai");
        return;
    }

    // If all validations pass, prepare user data
    const userData = {
        name: name,
        phone: phone,
        date: selectedDate,
        timeFrom: fromTime,
        timeTo: toTime,
        orderTime: new Date().toISOString()
    };

    // Show confirmation alert
    showConfirmationAlert(userData);
});

// Cart Data Processing
function getData() {
    try {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartContainer = $("#sss");
        let total = 0;

        // Clear existing content
        cartContainer.empty();

        // Process each cart item
        cart.forEach(item => {
            const formattedPrice = formatPrice(item.price);
            
            cartContainer.append(`
                <div>
                    <h5>${item.location}</h5>
                    <h5>Rp ${formattedPrice},00</h5>
                </div>
            `);

            total += item.price * item.qty;
        });

        // Update total price
        const formattedTotal = formatPrice(total);
        $("#total").html(`Rp ${formattedTotal},00`);

    } catch (error) {
        console.error("Error processing cart data:", error);
        showErrorAlert("Terjadi kesalahan dalam memproses data keranjang");
    }
}

// Initialize cart data when page loads
document.addEventListener("DOMContentLoaded", () => {
    getData();
});

// Input event listeners for real-time validation
nameInput.addEventListener("input", () => {
    const name = nameInput.value.trim();
    if (name && !validateName(name)) {
        nameInput.style.borderBottomColor = "red";
    } else {
        nameInput.style.borderBottomColor = "#d8b99c";
    }
});

phoneInput.addEventListener("input", () => {
    const phone = phoneInput.value.trim();
    if (phone && !validatePhone(phone)) {
        phoneInput.style.borderBottomColor = "red";
    } else {
        phoneInput.style.borderBottomColor = "#d8b99c";
    }
});