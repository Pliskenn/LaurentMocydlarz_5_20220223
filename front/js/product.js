// Récupérer l'ID du produit
const queryString = new URLSearchParams(window.location.search);

// const productId =
const searchParams = new URLSearchParams(queryString);
const productId = searchParams.get("id");

populateProductForm(productId);

// Intégration des données à la page produit
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
  for (let chooseColor of product.colors) {
    document.getElementById(
      "colors"
    ).innerHTML += `<option value="${chooseColor}">${chooseColor}</option>`;
  }

  // Répuération de la quantité
  targetQty = document.getElementById("quantity");

  // Récupération de la séléction
  target = document.getElementById("addToCart");

  target.addEventListener("click", () => {
    const getItem = localStorage.getItem("products");
    const getParseItem = JSON.parse(getItem);
    console.log("JSON.parse("+getItem+")");
    console.log("getItemparse = "+getParseItem);
    cart = JSON.parse(localStorage.getItem("products"));
    productAdded = {
      quantity : targetQty.value
    }
    // Convertir en chaine de caractéres 
    cart.push(productAdded);
    localStorage.setItem("products", JSON.stringify(cart));
  });
}
