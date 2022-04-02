// UrlSearchParams pour recupérer l'id de l'article
// const productId = 

// Utilise getProcduct getProduct(productId)
async function populateProductForm() {
    const product = await getProduct(productId);

    
}


for (let i = 0; i < data.length; i++) {
    {
    document.getElementById(
      "item_img"
    ).innerHTML += `<img src="../images/${data[i]._imageUrl}" alt="${data[i]._description}">`;
  }
};