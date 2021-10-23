// Fetch products attributes from the API
function fetchTeddies() {
  fetch("http://localhost:3000/api/teddies")
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response failed");
      }
    })
    .then(function(teddies) {
      for (let i = 0; i < teddies.length; i++) {
        displayTeddies(teddies[i]);
      }
    })
    .catch(function(err) {
      console.error(err)
    });
}

// Display each product and its details in a cards grid
function displayTeddies(teddy) {
    // Get HTML element contained in teddies cards
    let cardList = document.querySelector(".teddies");
    
    // Create HTML elements contained in products cards
    let cardColumn = document.createElement("div");
    let cardItem = document.createElement("div");
    let cardLink = document.createElement("a");
    let cardImage = document.createElement("img");
    let cardBody = document.createElement("div");
    let cardTop = document.createElement("div");
    let cardTitle = document.createElement("h4");
    let cardPrice = document.createElement("span");
    let cardText = document.createElement("p");

    // Set the related attribute values to the HTML elements
    cardLink.href = "product.html?id=" + teddy._id;
    cardImage.src = teddy.imageUrl;
    cardTitle.textContent = teddy.name;
    cardPrice.textContent = (teddy.price/100) + " €";
    cardText.textContent = teddy.description;

    // Style the products cards by adding CSS/Bootstrap classes to the HTML elements
    cardColumn.classList.add("col-12", "col-md-6", "col-lg-4", "my-4");
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



