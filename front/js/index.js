async function displayProducts() {
  const products = await getAllProducts();
  console.log(products);
  for (let i = 0; i < products.length; i++) {
    document.getElementById(
      "items"
    ).innerHTML += `<a href="./product.html?id=${products[i]._id}">
          <article>
            <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
            <h3 class="productName">${products[i].name}</h3>
            <p class="productDescription">${products[i].description}</p>
          </article>
        </a>`;
  }
}
displayProducts();
