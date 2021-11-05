// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //

let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));
console.log('voici les produits dans le localStorage', productInLocalStorage);

// AFFICHER LES PRODUITS DU PANIER

 // je sélectionne la partie html concernée par la modification
 let cartAndFormContainer = document.getElementById('cartAndFormContainer');
 console.log(cartAndFormContainer);

 // si le panier est vide : afficher 'le panier est vide'
if(productInLocalStorage === null || productInLocalStorage == 0) {
  document.querySelector("#cart__items").innerHTML =`
  <div class="cart__empty">
    <p>Votre panier est vide ! <br> Merci de sélectionner des produits depuis la page d'accueil</p>
  </div>`;
}
// si le panier n'est pas vide : afficher les produits dans le localStorage
else{ 
  let itemCards = [];
      //expression initiale; condition; incrémentation
  for (i = 0; i < productInLocalStorage.length; i++) {
    console.log(productInLocalStorage.length);
    // le code suivant sera injecté à chaque tour de boucle
    // selon la longueur des produits dans le local storage
    itemCards = itemCards + `
    
    <article class="cart__item" data-id="${productInLocalStorage[i].id}" data-color="${productInLocalStorage.color}">
    <div class="cart__item__img">
      <img src="${productInLocalStorage[i].image}" alt="${productInLocalStorage[i].alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${productInLocalStorage[i].name}</h2>
        <p>${productInLocalStorage[i].color}</p>
        <p>${productInLocalStorage[i].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `; 
    console.log(itemCards);
  }
  if (i == productInLocalStorage.length) {
  const itemCart = document.getElementById('cart__items');
  itemCart.innerHTML += itemCards;
}

// je modifie la quantité dans le panier
function changeQtt() {
  let itemQtt = document.querySelectorAll('.itemQuantity');

  for (let m = 0; m < itemQtt.length; m++){
    itemQtt[m].addEventListener('change' , (event) => {
          event.preventDefault();

          //Selection de l'element à modifier en fonction de son id ET sa couleur
          let itemOldQtt = productInLocalStorage[m].quantity;
          let itemNewQtt = itemQtt[m].value;
          
          const resultFind = productInLocalStorage.find((el) => el.itemNewQtt !== itemOldQtt);

          resultFind.quantity = itemNewQtt;
          productInLocalStorage[m].quantity = resultFind.quantity;

          localStorage.setItem('product', JSON.stringify(productInLocalStorage));

          // avertir de la suppression et recharger la page
          alert('Votre panier est à jour.');
          window.location.href = "cart.html";
    
      })
  }
  console.log('je suis la quantité qui change', itemQtt);
}
changeQtt();

// je supprime un produit dans le panier
function deleteArticle() {
  const deleteItem = document.querySelectorAll('.deleteItem');
  console.log('je suis le bouton suppr', deleteItem);

  for (let j = 0; j < deleteItem.length; j++) { 
    deleteItem[j].addEventListener('click', (event) => {
      event.preventDefault();

      // enregistrer l'id séléctionné par le bouton supprimer
      let deleteId = productInLocalStorage[j].id;

      // supprimer l'élément cliqué par le bouton supprimer
      productInLocalStorage = productInLocalStorage.filter( elt => elt.id !== deleteId);
      console.log('je suis le nouveau localstorage', productInLocalStorage);
      
      // envoyer la variable dans le localStorage
      localStorage.setItem('product', JSON.stringify(productInLocalStorage));

      // avertir de la suppression et recharger la page
      alert('Votre article a bien été supprimé.');
      window.location.href = "cart.html";

    });
  }
}
deleteArticle();

// j'affiche le total des articles dans le panier
function totalArticles() {
  let totalItems = 0;
  for (k in productInLocalStorage) {
    const newQuantity = parseInt(productInLocalStorage[k].quantity, 10);
    totalItems += newQuantity;
  }
  return totalItems;
}
const totalQuantity = document.getElementById('totalQuantity');
totalQuantity.textContent = totalArticles();

// je calcule le montant total du panier
function priceAmount() {
  const calculPrice = [];
  for (l = 0; l < productInLocalStorage.length; l++) {
    const cartAmount = productInLocalStorage[l].price * productInLocalStorage[l].quantity;
    calculPrice.push(cartAmount);
    const reduce = (previousValue, currentValue) => previousValue + currentValue;
    total = calculPrice.reduce(reduce);
  }
  const totalPrice = document.getElementById('totalPrice');
  totalPrice.textContent = total;

  console.log('je suis le total du prix', calculPrice);
}
priceAmount();

} // fin else : s'il y a des produits dans le panier
/////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
// DEMANDER LES INFOS DE L'UTILISATEUR



// j'envoie le formulaire dans le serveur
function postForm() {
  const order = document.getElementById('order');
  order.addEventListener('click', (event)=>{
  event.preventDefault();
  
  // je récupère les données du formulaire dans un objet
  const formValues = {
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    address : document.getElementById('address').value,
    city : document.getElementById('city').value,
    email : document.getElementById('email').value
  }
  console.log('je suis formValues', formValues);

  // je mets l'objet formValues dans le localStorage
  localStorage.setItem('formValues', JSON.stringify(formValues));

  // je mets les valeurs du formulaire et les produits sélectionnés
  // dans un objet que j'envoie au serveur
  const sendFormData = {
    formValues,
    productInLocalStorage,
  }
  console.log('je suis sendformData',sendFormData);

  // j'envoie le formulaire + localStorage (sendFormData) 
  // complet vers le serveur


  }) // fin eventListener postForm
} // fin envoi du formulaire postForm
postForm();