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

const products = [1,2,3,4,5,6,7];
var length = products.length;
for (var i = 0; i < length; i++) {
    console.log(products[i]);  
}