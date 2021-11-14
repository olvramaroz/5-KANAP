//---------JE FAIS APPEL A L'API QUI CONTIENT LES PRODUITS---------

//je demande à fetch de récupérer les données depuis l'url de l'API : 
fetch('http://localhost:3000/api/products')
    // première promesse .then qui va récupérer la réponse (en staged)
    // en la transformant en json pour faciliter l'intérprétation par le navigateur :
  .then(res => res.json())
    // deuxième promesse .then qui va afficher (en online)
    // les données contenues dans ma fonction showProducts :
  .then(data => { 
    showProducts(data);
  })
  // j'ajoute un message au cas où le serveur ne répond pas
  .catch(_error => {
    alert('Oops ! Le serveur ne répond pas, suivez les instructions dans le READ.me.');
  });

  //---------J'AFFICHE TOUS LES PRODUITS---------

function showProducts(data) {
    // pour ma variable product de ma promise .then data
    for (product of data) {
        // trouver l'élément #items dans index.html...
        const itemCard = document.getElementById('items');
        // ... et le modifier avec le contenu entre ``
        // le + sert à ajouter tous les éléments tant qu'il y en a
        itemCard.innerHTML +=`
        <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
        </a>
      `; // le dollar+accolades est une nouvelle forme de concaténation
      // qui permet de directemet combiner des variables et des clés 
      // dans un objet ou tableau
    }
}

// fin script.js