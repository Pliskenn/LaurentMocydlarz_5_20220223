async function getAllProducts() {
  return await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => data);
}
async function displayProduct() {
  const products = await getAllProducts();
  console.log(products);
}

displayProduct();
