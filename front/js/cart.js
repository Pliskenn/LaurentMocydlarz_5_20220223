// Importation du LocalStorage
let productsLocalStorage = JSON.parse(localStorage.getItem("products"));
console.log(productsLocalStorage);

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
  </article>`
}


// Vérifier s'il y a du contenu dans le panier
if (productsLocalStorage === null || productsLocalStorage.length === 0) {
    document.getElementById(
        "cart__items"
    ).innerHTML = `<h2 class="cart__item">Votre panier est vide.</h2>`;
} else {
    for (let i = 0; i < productsLocalStorage.length; i++) {
        populateProductForm(productsLocalStorage[i]);
    }
}