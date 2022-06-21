// Importation du LocalStorage
let productsLocalStorage = JSON.parse(localStorage.getItem("products"));
console.log(productsLocalStorage);

// Vérifier s'il y a du contenu dans le panier
if (productsLocalStorage === null || productsLocalStorage.length === 0) {
  document.getElementById(
    "cart__items"
  ).innerHTML = `<h2 class="cart__item">Votre panier est vide.</h2>`;
  sumOfAllProducts();

  // Si le panier n'est pas vide
} else {
  // Appeler la fonction pour récupérer la liste des produits (objets) présents dans le panier
  loadCartProducts();
}

// Récupérer la liste des produits (objets) présents dans le panier
async function loadCartProducts() {
  let productsLocalStorage = JSON.parse(localStorage.getItem("products"));
  for (let i = 0; i < productsLocalStorage.length; i++) {
    await populateProductForm(productsLocalStorage[i]);
  }

  // Afficher la quantité et le prix total
  sumOfAllProducts();

  // Modifier la quantité du produit
  changeProductQuantity();

  // Supprimer un produit
  deleteProductQuantity();
}

// Récupérer les informations produits par leur id
async function populateProductForm(productData) {
  const product = await getProduct(productData.id);

  // Intégration HTML
  document.getElementById(
    "cart__items"
  ).innerHTML += `<article class="cart__item" data-id="${product._id}" data-color="${productData.color}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${productData.color}</p>
        <p>${product.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productData.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
}

// Valider le formulaire

const cartForm = document.querySelector(".cart__order__form");

// ******* Paramétrage des conditions de validation des champs du formulaire *******

// Fonction de vérification des champs "Nom", "Prénom" et "Commune"

const basicField = function (checkField) {
  let basicWord = new RegExp("^[a-zA-Z\u00C0-\u00FF -]*$");

  let testBasicField = basicWord.test(checkField.value);
  let validateField = checkField.nextElementSibling;

  if (testBasicField) {
    validateField.innerHTML = "";
    console.log("Nom, Prénom ou Ville OK");
  } else {
    validateField.innerHTML =
      "Seuls les lettres, tiret et espace sont autorisés dans ce champ.";
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
    validateField.innerHTML = "Veuillez entrer une adresse valide.";
  }
};
// Fonction de vérification du champ "Mail"

const mailField = function (checkField) {
  let mailAddress = new RegExp(
    "^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$",
    "i"
  );

  let testMailField = mailAddress.test(checkField.value);
  let validateField = checkField.nextElementSibling;

  if (testMailField) {
    validateField.innerHTML = "";
    console.log("Mail OK");
  } else {
    validateField.innerHTML = "Veuillez entrer une adresse mail valide.";
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

// Envoi du panier + formulaire

// ****** Envoi du panier + formulaire ******

cartForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Récupérer les infos du formulaire
  const setFirstName = cartForm.firstName.value;
  const setLastName = cartForm.lastName.value;
  const setAddress = cartForm.address.value;
  const setCity = cartForm.city.value;
  const setMail = cartForm.email.value;

  // Récupérer les éléments du panier

  let productsLocalStorage = JSON.parse(localStorage.getItem("products"));

  let productOfCart = [];
  for (let i = 0; i < productsLocalStorage.length; i++) {
    productOfCart.push(productsLocalStorage[i].id);
  }

  //  Construction d'un array depuis le local storage

  const order = {
    contact: {
      firstName: setFirstName,
      lastName: setLastName,
      address: setAddress,
      city: setCity,
      email: setMail,
    },
    products: productOfCart,
  };

  console.log(order);

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  .then((res) => res.json())
  .then((data) => {
    data.orderId;
    if (data.orderId && data.orderId.length) {
      localStorage.setItem("products", JSON.stringify([]));
      document.location.href=`confirmation.html?id=${data.orderId}`;
    } else {
      alert("Votre commande n'a pas pu être enregistrée.")
    }
  });
  // Redirection vers la page de confirmation
});
