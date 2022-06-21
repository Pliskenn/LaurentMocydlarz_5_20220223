// Récupérer l'ID du produit
const searchParams = new URLSearchParams(window.location.search);
const orderId = searchParams.get("id");

const confirmationId = document.getElementById("orderId");
confirmationId.innerText = orderId;

