async function getAllProducts() {
  return await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => data);
}

async function getProduct(id) {
  return await fetch("http://localhost:3000/api/products/"+ id)
    .then((res) => res.json())
    .then((data) => data);
}
