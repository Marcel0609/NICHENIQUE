var count = document.getElementsByClassName("count");
var price = document.getElementsByClassName("price");
var total = document.getElementsByClassName("total");

document.getElementById("Purchase_button").addEventListener("click", () => {
  Swal.fire({
    title: "Purchase",
    text: "Do you want to purchase this item?",
    icon: "success",
    showCancelButton: true,
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.replace("/proces_order.html");
    }
  });
});

// Fungsi untuk memformat harga ke dalam bentuk Rupiah
function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace(/\s/g, '') + ",00";
}

function cleanRupiah(value) {
  return parseFloat(value.replace(/[^\d]/g, "")); // Menghapus semua karakter non-digit dan mengonversi ke float
}

function minCount(id) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let itemPrice = cleanRupiah(price[id].innerHTML);

  if (count[id].innerHTML == 1) {
    cart.splice(id, 1); // Hapus item dari keranjang jika jumlahnya 1
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.replace("/order.html");
    return;
  }

  // Update jumlah barang
  count[id].innerHTML = parseInt(count[id].innerHTML) - 1;

  // Hitung total price baru
  let totalPrice = itemPrice * parseInt(count[id].innerHTML);
  total[id].innerHTML = formatRupiah(totalPrice);

  cart[id].qty--;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function plusCount(id) {
  let itemPrice = cleanRupiah(price[id].innerHTML);

  // Update jumlah barang
  count[id].innerHTML = parseInt(count[id].innerHTML) + 1;

  // Hitung total price baru
  let totalPrice = itemPrice * parseInt(count[id].innerHTML);
  total[id].innerHTML = formatRupiah(totalPrice);

  let cart = JSON.parse(localStorage.getItem("cart"));
  cart[id].qty++;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getData() {
  let cart = JSON.parse(localStorage.getItem("cart"));

  for (let i = 0; i < cart.length; i++) {
    let itemPrice = parseFloat(cart[i].price);
    let itemTotal = itemPrice * cart[i].qty;
    
    $("tbody").append(`<tr>
              <td><img src=${cart[i].image} alt="" /></td>
              <td>${cart[i].location}</td>
              <td class="quantity">
                <div>
                  <small class="min" onclick="minCount(${i})">-</small>
                  <p class="count">${cart[i].qty}</p>
                  <p>Pax</p>
                  <small class="plus" onclick="plusCount(${i})">+</small>
                </div>
              </td>
              <td class="price">${formatRupiah(itemPrice)}</td>
              <td class="total">${formatRupiah(itemTotal)}</td>
            </tr >`);
  }
}

getData();