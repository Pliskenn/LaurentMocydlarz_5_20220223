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

  let item__img = document.getElementsByClassName("item__img");

  // Image produit
  item__img[0].innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

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

  // Récupération de la quantité
  targetQty = document.getElementById("quantity");

  // Récupération de la couleur
  targetColor = document.getElementById("colors");

  // Récupération de la séléction : bouton "Ajouter au panier"
  target = document.getElementById("addToCart");

  target.addEventListener("click", () => {
    cart = JSON.parse(localStorage.getItem("products"));
    productAdded = {
      quantity: targetQty.value,
      color: targetColor.value,
      id: productId,
    };

    // Convertir en chaine de caractéres
    if (cart == null) {
      cart = [];
    }

    // Renvoyer la position du produit du tableau (Retourner le produit du panier)
    productInCart = cart.findIndex((data) => {
      let result;
      if (data.color === targetColor.value && data.id === productId) {
        result = true;
      } else {
        result = false;
      }
      return result;
    });
    console.log(productInCart);

    // Si le produit n'existe pas 
    if (targetQty.value < 1) {
      alert("Vous devez commander au moins une quantité du produit.");
    } else if (targetQty.value > 100  || targetQty.value + productInCart > 100 ) {
      alert("Vous ne pouvez pas commander plus de 100 quantités de ce produit.");
    } else if (targetColor.value == false) {
      alert("Vous devez sélectionner une couleur.");
    } else if (productInCart === -1) {
      cart.push(productAdded);
      alert("Nous avons bien ajouté " + targetQty.value + " " + product.name + " au panier.");
    } else {
    console.log(cart[productInCart]);
      // Modifier la quantité dans le LocalStorage si le produit existe
      let newQuantity = parseInt(cart[productInCart].quantity) + parseInt(targetQty.value);
      cart[productInCart].quantity = newQuantity;
      console.log(cart);
      alert("Nous avons bien ajouté " + targetQty.value + " " + product.name + " au panier.");
    }
    // Mettre à jour le panier
    localStorage.setItem("products", JSON.stringify(cart));
  });
}