//---------JE REDIRIGE L'URL DE L'API---------

// je crée une nouvelle url à partir de l'url actuelle 
// et en ajoutant searchParams pour manipuler les paramètres de requête d'URL :
let params = new URL(window.location.href).searchParams;
// j'indique que la nouvelle url sera ajoutée d'un id :
let newID = params.get('id');

//---------J'APPELLE DE NOUVEAU L'API AVEC L'ID DU CANAPE CHOISI---------

    // je crée les variables correspondants à chaque élément :
    const image = document.getElementsByClassName('item__img');
    const title = document.getElementById('title');
    const price = document.getElementById('price');
    const description = document.getElementById('description');
    const colors = document.getElementById('colors');

    let imageURL = "";
    let imageAlt = "";

fetch("http://localhost:3000/api/products/" + newID)
  .then(res => res.json())
  .then(data => {
    // je modifie le contenu de chaque variable avec les bonnes données :
    image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    imageURL = data.imageUrl;
    imageAlt = data.altTxt;
    title.innerHTML = `<h1>${data.name}</h1>`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;

    // je configure le choix des couleurs 
    for (number in data.colors) {
      colors.options[colors.options.length] = new Option(
        data.colors[number],
        data.colors[number]
      );
    }
  })

//---------JE RECUPERE LES DONNEES PAR RAPPORT AU CHOIX DE L'UTILISATEUR---------

const quantity = document.getElementById('quantity');
const colors = document.getElementById('colors');

const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', (event) => {
  event.preventDefault();

  const selection = {
    id: newID,
    image: imageURL,
    alt: imageAlt,
    name: title.textContent,
    price: price.textContent,
    color: colors.value,
    quantity: quantity.value,
  };
  console.log(selection);
  
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// // je déclare une variable produitEnregistreDansLocalStorage dans laquelle je mets les clés+valeurs dans le local storage
// // JSON.parse permet de convertir les données au format JSON en objet JavaScript
// let produitEnregistreDansLocalStorage =  JSON.parse(localStorage.getItem("produit"));
// console.log(produitEnregistreDansLocalStorage);

// // s'il y a des produits enregistrés dans le localStorage
// if (produitEnregistreDansLocalStorage) {
  
// } 
// // s'il n'y a aucun produit enregistré dans le localStorage 
// else {
//   produitEnregistreDansLocalStorage = [];
//   console.log(produitEnregistreDansLocalStorage);
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////
