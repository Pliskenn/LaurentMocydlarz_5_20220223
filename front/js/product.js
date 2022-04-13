// UrlSearchParams pour recupérer l'id de l'article
const queryString = new URLSearchParams(window.location.search);

// const productId =
const searchParams = new URLSearchParams(queryString);
const productId = searchParams.get("id");
const productColors = searchParams.get("colors");

populateProductForm(productId);

// Utilise getProcduct getProduct(productId)
async function populateProductForm(productId) {
  const product = await getProduct(productId);
  console.log(product);

  // Image produit
  document.getElementsByClassName(
    "item__img"
  )[0].innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

  // Nom du produit
  document.getElementById(
    "title"
  ).innerHTML += `<h1 id="title">${product.name}</h1>`;

  // Prix
  document.getElementById(
    "price"
  ).innerHTML += `<span id="price">${product.price}</span>`;

  // Description
  document.getElementById(
    "description"
  ).innerHTML += `<p id="description">${product.description}</p>`;

  // Couleurs
  for (let chooseColor of product.colors){
    document.getElementById(
      "colors"
    ).innerHTML += `<option value="${chooseColor}">${chooseColor}</option>`;
}
 }

 cart = localStorage;
