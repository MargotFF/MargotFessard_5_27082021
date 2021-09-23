let urlApi = new URL ("http://localhost:3000/api/teddies");

// Fetch teddies attributes from the API
function fetchTeddies() {
  fetch(urlApi)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response error");
      }
    })
    .then(function(teddies) {
      console.log(teddies);
      for (let i = 0; i < teddies.length; i++) {
        displayTeddies(teddies[i]);
      }
    })
    .catch(function(err) {
      console.error('Fetch error:', err)
    });
}

function displayTeddies(teddy) {
    let cardList = document.querySelector(".teddies");
    
    // Create HTML elements contained in teddies cards
    let cardColumn = document.createElement("div");
    let cardItem = document.createElement("div");
    let cardLink = document.createElement("a");
    let cardImage = document.createElement("img");
    let cardBody = document.createElement("div");
    let cardTop = document.createElement("div");
    let cardTitle = document.createElement("h5");
    let cardPrice = document.createElement("span");
    let cardText = document.createElement("p");

    // Set the related attribute value to the HTML elements
    cardLink.href = "../product.html?id=" + teddy._id;
    cardImage.src = teddy.imageUrl;
    // cardTitle.appendChild(document.createTextNode(teddy.name));
    cardTitle.textContent = teddy.name;
    // cardPrice.appendChild(document.createTextNode((teddy.price/100).toLocaleString('fr-FR', {style:'currency', currency:'EUR'})));
    cardPrice.textContent = (teddy.price/100).toLocaleString('fr-FR', {style:'currency', currency:'EUR'});
    // cardText.appendChild(document.createTextNode(teddy.description));
    cardText.textContent = teddy.description;

    // Style the teddies cards by adding CSS/Bootstrap classes to the HTML elements
    cardColumn.classList.add("col-12", "col-lg-4", "my-4");
    cardItem.classList.add("card", "shadow", "card-bg");
    cardLink.classList.add("card-link");
    cardImage.classList.add("card-img-top", "card-img");
    cardBody.classList.add("card-body");
    cardTop.classList.add("card-top", "mb-3");
    cardTitle.classList.add("card-title", "mb-0");
    cardPrice.classList.add("card-price");
    cardText.classList.add("card-text");

    // Append the HTML elements in the card element
    cardList.appendChild(cardColumn);
    cardColumn.appendChild(cardItem);
    cardItem.appendChild(cardLink);
    cardLink.appendChild(cardImage);
    cardLink.appendChild(cardBody);
    cardBody.appendChild(cardTop);
    cardBody.appendChild(cardText);
    cardTop.appendChild(cardTitle);
    cardTop.appendChild(cardPrice);
}

fetchTeddies();



