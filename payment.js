document.getElementById("qr").addEventListener("click", () => {
  document.getElementById("text").innerHTML =
    "Your Payment has succeed you can show this qr to get your orders";
  document.getElementById("qr").src = "image/image 34.png";
  document.getElementById("temp").innerHTML = "";
  localStorage.clear();
});
function getData() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  console.log($("sss"));
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    console.log("SSS");
    let temp = "";
    let len = cart[i].price.length;
    console.log("len", len);

    for (let j = 0; j < len; j++) {
      if (j % 3 == 0 && j != 0) {
        temp = temp + ".";
      }
      temp = temp + cart[i].price[len - 1 - j];
      console.log("cart", cart[i].price[len - j]);
    }
    temp = temp.split("");
    temp = temp.reverse();
    temp = temp.join("");

    $("#sss").append(
      `<div>
              <h5>${cart[i].location}</h5>
              <h5>Rp ${temp},00</h5>
        </div>`
    );
    total = total + cart[i].price * cart[i].qty;
  }
  total = total.toString();

  temp = "";
  let totalLen = total.length;
  console.log("Total", total);
  for (let j = 0; j < totalLen; j++) {
    if (j % 3 == 0 && j != 0) {
      temp = temp + ".";
    }
    temp = temp + total[totalLen - 1 - j];
    console.log("cart", total[totalLen - j]);
  }
  console.log(temp);
  temp = temp.split("");
  temp = temp.reverse();
  temp = temp.join("");
  $("#total").html(`Rp ${temp},00`);
}
getData();
