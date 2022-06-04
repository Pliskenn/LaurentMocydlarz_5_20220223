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
  document.getElementById("title").innerHTML += `${product.name}`;

  // Prix
  document.getElementById("price").innerHTML += `${product.price}`;

  // Description
  document.getElementById("description").innerHTML += `${product.description}`;

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

    if (targetQty.value < 1) {
      alert("Vous devez commander au moins une quantité du produit.");
      return;
    }

    if (targetColor.value == false) {
      alert("Vous devez sélectionner une couleur.");
      return;
    }

    // Mettre à jour le pannier
    const response = updateCartQty(
      productId,
      targetColor.value,
      targetQty.value
    );

    switch (response) {
      case 0:
        alert(
          "Vous ne pouvez pas commander plus de 100 quantités de ce produit."
        );

        break;

      case 1:
        alert("Nous avons bien ajouté " + targetQty.value + " " + product.name + " au panier.");

        break;

      case 2:
      case 3:
        alert("La quantité du produit a été mise à jour.");
        break;

      default:
        alert("Une erreur s'est produite.");

        break;
    }

    return ;
    if (targetQtyValue > 100 || targetQtyValue + productInCartQuantity > 100) {
      alert(
        "Vous ne pouvez pas commander plus de 100 quantités de ce produit."
      );
    }
    if (productInCartIndex === -1) {
      cart.push(productAdded);
      alert(
        "Nous avons bien ajouté " +
          targetQty.value +
          " " +
          product.name +
          " au panier."
      );
    } else {
      // Modifier la quantité dans le LocalStorage si le produit existe
      cart[productInCartIndex].quantity =
        parseInt(targetQty.value) + productInCartQuantity;
      console.log(cart);
      alert(
        "Nous avons bien ajouté " +
          targetQty.value +
          " " +
          product.name +
          " au panier."
      );
    }

    // // Recherche l'index du produit dans le panier (Retourner le produit du panier)
    // productInCartIndex = cart.findIndex((data) => {
    //   if (data.color === targetColor.value && data.id === productId)
    //     return true;

    //   return false;
    // });
    // let productInCartQuantity = 0;
    // // Si le produit existe
    // if (productInCartIndex !== -1 ){
    //   productInCartQuantity = parseInt(cart[productInCartIndex].quantity);
    // }

    // const targetQtyValue = parseInt(targetQty.value);

    // else if (targetQtyValue > 100  || ( targetQtyValue + productInCartQuantity) > 100 ) {
    //   alert("Vous ne pouvez pas commander plus de 100 quantités de ce produit.");
    // } else  else if (productInCartIndex === -1) {
    //   cart.push(productAdded);
    //   alert("Nous avons bien ajouté " + targetQty.value + " " + product.name + " au panier.");
    // } else {
    //   // Modifier la quantité dans le LocalStorage si le produit existe
    //   cart[productInCartIndex].quantity = parseInt(targetQty.value) + productInCartQuantity;
    //   console.log(cart);
    //   alert("Nous avons bien ajouté " + targetQty.value + " " + product.name + " au panier.");
    // }
    // Mettre à jour le panier
    // localStorage.setItem("products", JSON.stringify(cart));
  });
}
