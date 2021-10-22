//---------JE REDIRIGE L'URL DE L'API---------

// je crée une nouvelle url à partir de l'url actuelle 
// et en ajoutant searchParams pour manipuler les paramètres de requête d'URL :
let params = new URL(window.location.href).searchParams;
// j'indique que la nouvelle url sera ajoutée d'un id :
let newID = params.get('id');

//---------J'APPELLE DE NOUVEAU L'API AVEC L'ID DU CANAPE CHOISI---------

fetch("http://localhost:3000/api/products/" + newID)
  .then(res => res.json())
  .then(data => {
    // je crée les variables correspondants à chaque élément :
    const image = document.querySelector('div.item__img');
    const name = document.getElementById('title');
    const price = document.getElementById('price');
    const description = document.getElementById('description');
    const colors = document.getElementById('colors');

    // je modifie le contenu de chaque variable avec les bons données :
    image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    name.innerHTML = `<h1>${data.name}</h1>`;
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

// pour obtenir les valeurs du stockage

function setData() {
  let currentName = localStorage.getItem('title');
  let currentPrice = localStorage.getItem('price');
  let currentColor = localStorage.getItem('colors');

  document.getElementById('title').value = currentName;
  document.getElementById('price').value = currentPrice;
  document.getElementById('colors').value = currentColor;
}

// pour enregistrer les valeurs du stockage

function itemStorage() {
  localStorage.setItem('title', document.getElementById('title').value);
  localStorage.setItem('price', document.getElementById('price').value);
  localStorage.setItem('colors', document.getElementById('colors').value);

  setData();
}

let listen = document.getElementById("addToCart");
listen.addEventListener("click", setData);
