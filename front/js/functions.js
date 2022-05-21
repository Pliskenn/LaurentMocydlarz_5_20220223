async function getAllProducts() {
  return await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => data);
}

async function getProduct(id) {
  return await fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((data) => data);
}

async function sumOfAllProducts() {
  let productsLocalStorage = JSON.parse(localStorage.getItem("products"));
  let totalPrice = 0;
  let totalQuantity = 0;

  for (let i = 0; i < productsLocalStorage.length; i++) {
    const productData = productsLocalStorage[i];
    const product = await getProduct(productData.id);
    // Calcul du prix du panier
    totalQuantity += parseInt(productData.quantity);
    totalPrice += parseFloat(product.price * totalQuantity);
    console.log(totalPrice, totalQuantity);
  }

  document.getElementById("totalPrice").innerText = totalPrice;
  document.getElementById("totalQuantity").innerText = totalQuantity;
}
