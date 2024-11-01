const infoPackageImage = [
  "image/image2.png",
  "image/image7.png",
  "image/image8.png",
  "image/image9.png",
  "image/image10.png",
];
const infoPackageLocation = [
  "MIE GORENG",
  "SATE AYAM",
  "GADO-GADO",
  "NASI",
  "TEH",
];

const infoPackageDetail = [
  `<div><h2>Packages:</h2>
            <ol>
              <li>
                <strong>Basic Package</strong><br />
                Rp 180.000,00/Person<br />
                Include Ticket Seaworld, Sunglasses, Cooler Box
              </li>
              <li>
                <strong>Premium Package</strong><br />
                Rp 210.000,00/Person<br />
                Include Ticket Seaworld, Samudra, Sunglasses, Cooler Box, Tea
              </li>
              <li>
                <strong>Exclusive Package</strong><br />
                Rp 250.000,00<br />
                Include Ticket Seaworld, Samudra, Jakarta Bird Land, Sunglasses,
                Cooler Box, Juice
              </li>
            </ol>
  
            <h2>Recommendation Items:</h2>
            <ul>
              <li>
                Sunglasses, Umbrella, Spoon & Fork, Mat, Cooler Box, Beach Ball,
                Beach Toys
              </li>
            </ul><div>`,
  `<div><h2>Packages:</h2>
            <ol>
              <li>
                <strong>Basic Package</strong><br />
                Rp 180.000,00/Person<br />
                Include Ticket Seaworld, Sunglasses, Cooler Box
              </li>
              <li>
                <strong>Premium Package</strong><br />
                Rp 210.000,00/Person<br />
                Include Ticket Seaworld, Samudra, Sunglasses, Cooler Box, Tea
              </li>
              <li>
                <strong>Exclusive Package</strong><br />
                Rp 250.000,00<br />
                Include Ticket Seaworld, Samudra, Jakarta Bird Land, Sunglasses,
                Cooler Box, Juice
              </li>
            </ol>
  
            <h2>Recommendation Items:</h2>
            <ul>
              <li>
                Sunglasses, Umbrella, Spoon & Fork, Mat, Cooler Box, Beach Ball,
                Beach Toys
              </li>
            </ul><div>`,
  `<div><h2>Packages:</h2>
            <ol>
              <li>
                <strong>Basic Package</strong><br />
                Rp 180.000,00/Person<br />
                Include Ticket Seaworld, Sunglasses, Cooler Box
              </li>
              <li>
                <strong>Premium Package</strong><br />
                Rp 210.000,00/Person<br />
                Include Ticket Seaworld, Samudra, Sunglasses, Cooler Box, Tea
              </li>
              <li>
                <strong>Exclusive Package</strong><br />
                Rp 250.000,00<br />
                Include Ticket Seaworld, Samudra, Jakarta Bird Land, Sunglasses,
                Cooler Box, Juice
              </li>
            </ol>
  
            <h2>Recommendation Items:</h2>
            <ul>
              <li>
                Sunglasses, Umbrella, Spoon & Fork, Mat, Cooler Box, Beach Ball,
                Beach Toys
              </li>
            </ul><div>`,
  `<div><h2>Packages:</h2>
            <ol>
              <li>
                <strong>Basic Package</strong><br />
                Rp 180.000,00/Person<br />
                Include Ticket Seaworld, Sunglasses, Cooler Box
              </li>
              <li>
                <strong>Premium Package</strong><br />
                Rp 210.000,00/Person<br />
                Include Ticket Seaworld, Samudra, Sunglasses, Cooler Box, Tea
              </li>
              <li>
                <strong>Exclusive Package</strong><br />
                Rp 250.000,00<br />
                Include Ticket Seaworld, Samudra, Jakarta Bird Land, Sunglasses,
                Cooler Box, Juice
              </li>
            </ol>
  
            <h2>Recommendation Items:</h2>
            <ul>
              <li>
                Sunglasses, Umbrella, Spoon & Fork, Mat, Cooler Box, Beach Ball,
                Beach Toys
              </li>
            </ul><div>`,
];

const price = ["50000", "35000", "75000", "7000", "15000"];

function addToCart(id) {
  // Get existing cart from localStorage or initialize an empty array if no cart exists
  Swal.fire({
    title: "Add item to cart!",
    text: "Do you want to add this item to cart?",
    // icon: "success",
    showCancelButton: true,
    confirmButtonText: "Add item",
    confirmButtonColor: " #7b5e3b",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(localStorage.hasOwnProperty("cart"));
      let tempCart;
      if (localStorage.hasOwnProperty("cart") === false) {
        tempCart = [];
      } else {
        tempCart = JSON.parse(localStorage.getItem("cart"));
      }
      // if (tempCart == undefined) {
      //   console.log("www");
      //   tempCart = [];
      // }
      // console.log(tempCart);
      // // Prepare the new item to add to the cart
      // const tempData = {
      //   image: infoPackageImage[id],
      //   location: infoPackageLocation[id],
      //   price: "180000",
      // };

      // Add the new item to the existing cart
      // console.log(tempData);
      let idx = 0;
      for (let i = 0; i < tempCart.length; i++) {
        if (tempCart[i].image == infoPackageImage[id]) {
          console.log(infoPackageImage[id]);
          tempCart[i].qty++;
          idx = 1;
          console.log(tempCart);
          localStorage.setItem("cart", JSON.stringify(tempCart));
          break;
        }
      }

      if (idx == 0) {
        tempCart.push({
          image: infoPackageImage[id],
          location: infoPackageLocation[id],
          price: price[id],
          qty: 1,
        });
        localStorage.setItem("cart", JSON.stringify(tempCart));
      }

      // console.log("Item added to cart:", tempData);
      window.location.replace("/NICHENIQUE/order.html");
    }
  });
}
