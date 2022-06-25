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
    totalPrice += parseFloat(product.price * parseInt(productData.quantity));
  }

  document.getElementById("totalPrice").innerText = totalPrice;
  document.getElementById("totalQuantity").innerText = totalQuantity;
}


// Changer la quantité du produit
function changeProductQuantity() {
  let cartItemsQuantity = document.querySelectorAll("input.itemQuantity");

  if (cartItemsQuantity.length) {
    cartItemsQuantity.forEach((itemQuantity) => {
      itemQuantity.addEventListener("change", (e) => {
        const targetQty = e.target.value;
        const parentCartItemElt = e.target.closest(".cart__item");
        const targetColor = parentCartItemElt.dataset.color;
        const productId = parentCartItemElt.dataset.id;
        cart = JSON.parse(localStorage.getItem("products"));
        console.log(targetQty);
        if (targetQty > 100 || targetQty < 1 ) {
          alert("Vous n'avez pas entré une quantité valide (entre 1 et 100).");
        } 
        // Faire un find sur le tableau de produits du panier et mettre à jour la qté
        updateCartQty(productId, targetColor, targetQty, "hard");
        sumOfAllProducts();
      });
    });
  } 
  else {
    console.log("Erreur");
  }
}


// Supprimer le produit
function deleteProductQuantity() {
  let cartItemsDeleteBtn = document.querySelectorAll(".deleteItem");

  if (cartItemsDeleteBtn.length) {
    cartItemsDeleteBtn.forEach((itemQuantity) => {
      itemQuantity.addEventListener("click", (e) => {
        const parentCartItemElt = e.target.closest(".cart__item");

        const targetColor = parentCartItemElt.dataset.color;
        const productId = parentCartItemElt.dataset.id;

        cart = JSON.parse(localStorage.getItem("products"));
        // Faire un find sur le tableau de produits du panier et mettre à jour la qté
        let newCart = cart.filter((data) => {
          if (data.color === targetColor && data.id === productId) return false;

          return true;
        });
        // Mettre à jour le panier
        localStorage.setItem("products", JSON.stringify(newCart));
        parentCartItemElt.remove();
        sumOfAllProducts();
      });
    });
  } else {
    console.log("Erreur delete");
  }
}

// Mettre à jour le panier
function updateCartQty(id, color, qty, replace = "soft") {
  if (parseInt(qty) > 100) return 0; // 0 signifie que la qté est > 100

  let response = -1;
  let cart = JSON.parse(localStorage.getItem("products"));
  if (cart == null) {
    cart = [];
  }

  let productInCartIndex = cart.findIndex((data) => {
    if (data.color === color && data.id === id) return true;

    return false;
  });

  // S'il ne sagit pas d'une mise à jour
  if (productInCartIndex === -1) {
    const productToAdd = {
      quantity: qty,
      color: color,
      id: id,
    };

    cart.push(productToAdd);
    response = 1; // Si le produit est bien ajouté on assigne à response la valeur 1
  } else {
    const productInCartQuantity = parseInt(cart[productInCartIndex].quantity);

    switch (replace) {
      case "hard":
        if (parseInt(qty) > 100 || parseInt(qty) < 1) return 0; // 0 signifie que la qté est > 100 ou < 1
        // La quantité produit est "écrasée" par la nouvelle valeur
        cart[productInCartIndex].quantity = parseInt(qty);
        response = 3; // Si le produit est bien ajouté on assigne à response la valeur 3

        break;

      case "soft":
        if (parseInt(qty) + productInCartQuantity > 100) return 0; // 0 signifie que la qté est > 100
        // La quantité ajoutée est additionnée à la quantité éxistante
        cart[productInCartIndex].quantity =
          parseInt(qty) + productInCartQuantity;
        response = 2; // Si le produit est bien ajouté on assigne à response la valeur 2

        break;

      default:
        break;
    }
  }
  
  // Mettre à jour le panier
  localStorage.setItem("products", JSON.stringify(cart));

  return response;
}



