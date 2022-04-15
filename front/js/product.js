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

    // Renvoyer la position du produit du tableau
    positionProduct = cart.findIndex((data) => {
      let result;
      if (data.color === targetColor.value && data.id === productId) {
        result = true;
      } else {
        result = false;
      }
      return result;
    });
    console.log(positionProduct);

    if (positionProduct === -1) {
      cart.push(productAdded);
    } else {
      console.log(cart[positionProduct]);
    }

    localStorage.setItem("products", JSON.stringify(cart));
  });

  // Récupération de la quantité
  // targetQty = document.getElementById("quantity");

  // // Récupération de la couleur
  // targetColor = document.getElementById("colors");

  // // Récupération de la séléction
  // target = document.getElementById("addToCart");

  // target.addEventListener("click", () => {
  //   // const getItem = localStorage.getItem("products");
  //   // const getParseItem = JSON.parse(getItem);
  //   // console.log("JSON.parse("+getItem+")");
  //   // console.log("getItemparse = "+getParseItem);
  //   cart = JSON.parse(localStorage.getItem("products"));
  //   productAdded = {
  //     quantity : targetQty.value,
  //     colour : targetColor.value,

  //   }
  //   // Convertir en chaine de caractéres
  //   cart.push(productAdded);
  //   localStorage.setItem("products", JSON.stringify(cart));
  // });
}
