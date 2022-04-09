// UrlSearchParams pour recupérer l'id de l'article
let params = new URLSearchParams(window.location.search);
params.get("id");
// const productId = 
const productId = id;
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