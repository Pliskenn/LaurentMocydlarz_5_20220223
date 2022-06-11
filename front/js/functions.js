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
        console.log(targetQty, parentCartItemElt);
        const targetColor = parentCartItemElt.dataset.color;
        const productId = parentCartItemElt.dataset.id;
        console.log(productId, targetColor);
        cart = JSON.parse(localStorage.getItem("products"));
        // Faire un find sur le tableau de produits du panier et mettre à jour la qté
        updateCartQty(productId, targetColor, targetQty, "hard");
        sumOfAllProducts();
      });
    });
  } else {
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

        console.log(productId, targetColor);
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
    console.log("Erreur");
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
        if (parseInt(qty) > 100 || parseInt(qty) < 1) return 0; // 0 signifie que la qté est > 100
        // La quantité produit est "écrasée" par la nouvelle valeur
        cart[productInCartIndex].quantity = parseInt(qty);
        response = 3; // Si le produit est bien ajouté on assigne à response la valeur 3

        break;

      case "soft":
        if (parseInt(qty) + productInCartQuantity > 100) return 0; // 0 signifie que la qté est > 100
        // La quantité ajoutée est additionnée à la quantité éxistante
        cart[productInCartIndex].quantity =
          parseInt(qty) + productInCartQuantity;
        console.log(cart);
        response = 2; // Si le produit est bien ajouté on assigne à response la valeur 2

        break;

      default:
        break;
    }
  }

  console.log(cart);
  // Mettre à jour le panier
  localStorage.setItem("products", JSON.stringify(cart));

  return response;
}

// Valider le formulaire

function checkCartForm() {
  let cartForm = document.querySelector(".cart__order__form");

  // Paramétrage des conditions de validation des champs du formulaire

  // Fonction de vérification des champs "Nom", "Prénom" et "Commune"

  const basicField = function (checkField) {
    let basicWord = new RegExp("^[a-zA-Z\u00C0-\u00FF -]*$");

    let testBasicField = basicWord.test(checkField.value);
    let validateField = checkField.nextElementSibling;

    if (testBasicField) {
      validateField.innerHTML = "";
      console.log("Nom, Prénom ou Ville OK");
    } else {
      validateField.innerHTML = "Veuillez n'entrer que des lettres pour valider ce champ.";
    }
  };

  // Fonction de vérification du champ "Adresse"
  const mailingField = function (checkField) {
    let mailingAddress = new RegExp(
      "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
    );

    let testMailingField = mailingAddress.test(checkField.value);
    let validateField = checkField.nextElementSibling;

    if (testMailingField) {
      validateField.innerHTML = "";
      console.log("Adresse OK");
    } else {
      validateField.innerHTML = "Veuillez n'entrer que des lettres pour valider ce champ.";
    }
  };
  // Fonction de vérification du champ "Mail"

  const mailField = function (checkField) {
    let mailAddress = new RegExp(
      '^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i'
    );

    let testMailField = mailAddress.test(checkField.value);
    let validateField = checkField.nextElementSibling;

    if (testMailField) {
      validateField.innerHTML = "";
      console.log("Mail OK");
    } else {
      validateField.innerHTML = "Veuillez n'entrer que des lettres pour valider ce champ.";
    }
  };

  // Détection des saisies dans les champs de formulaire

  // Prénom
  console.log(cartForm.firstName);
  cartForm.firstName.addEventListener("change", function () {
    basicField(this);
  });

  // Nom
  console.log(cartForm.lastName);
  cartForm.lastName.addEventListener("change", function () {
    basicField(this);
  });

  // Adresse
  console.log(cartForm.address);
  cartForm.address.addEventListener("change", function () {
    mailingField(this);
  });

  // Commune
  console.log(cartForm.city);
  cartForm.city.addEventListener("change", function () {
    basicField(this);
  });

  // Mail
  console.log(cartForm.email);
  cartForm.email.addEventListener("change", function () {
    mailField(this);
  });
}
