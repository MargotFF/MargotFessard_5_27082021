let urlApi = new URL ("http://localhost:3000/api/teddies/");

let params = new URL(document.location).searchParams;
let id = params.get("id");

// Fetch teddy's attributes via its ID from the API
function fetchTeddy(id) {
  fetch(urlApi + id)
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else if (response.id === undefined) {
      throw new Error("This product id does not exist");
    } else {
      throw new Error("Network response failed");
    }
  })
  .then(function(teddy) {
    displayTeddy(teddy);
    
    // Add an event listener to add product to cart
    let addToCart = document.querySelector(".add-to-cart");
    addToCart.addEventListener("click", function (event) {
      event.preventDefault();

      // Create the variable with the added product details
      let addedTeddy = { 
        ...teddy,
        price: teddy.price/100,
        quantity: 1,
      };

      // Check if product already exists in the cart
      let cart = JSON.parse(localStorage.getItem("orn:cart")) || [];
      let ifExists = false;
      let existingItem;

      for (i = 0; i < cart?.length; i++) {
        if (cart[i]._id === addedTeddy._id) {
          ifExists = true;
          existingItem = cart[i];
        }
      }

      // Add the product to the cart
      if (ifExists === false) {
        cart.push(addedTeddy);
        localStorage.setItem("orn:cart", JSON.stringify(cart));
      }

      // window.location.href = "cart.html"
    });
  })
  .catch(function(err) {
      console.error(err);
  });
}

// Display the teddy's details in the product page
function displayTeddy(teddy) {
  // Get HTML elements contained in product details
  let productLeft = document.querySelector(".product-left");
  let productTop = document.querySelector(".product-top");
  let productColors = document.querySelector(".product-colors");

  // Create HTML elements contained in product details
  let productImage = document.createElement("img");
  let productName = document.createElement("h3");
  let productPrice = document.createElement("h5");
  let productText = document.createElement("p");

  // Set the related attribute values to the HTML elements
  productImage.src = teddy.imageUrl;
  productName.textContent = teddy.name;
  productPrice.textContent = (teddy.price/100) + " €";
  productText.textContent = teddy.description;
  
  // Loop over colors array to set each color attribute
  for (let i = 0; i < teddy.colors.length; i++) {
    // Create, style and append the HTML element for the Boostrap grid
    let productColorColumn = document.createElement("div");
    productColorColumn.classList.add("col-3");
    productColors.appendChild(productColorColumn);
    // Create, set, style and append the HTML element for the color attribute
    let productColor = document.createElement("div");
    productColor.style.backgroundColor = teddy.colors[i];
    productColor.classList.add("product-color");
    productColorColumn.appendChild(productColor);
  }

  // Style the product details by adding CSS/Bootstrap classes to the HTML elements
  productImage.classList.add("product-img");
  productName.classList.add("product-title", "card-title");
  productPrice.classList.add("product-price");
  productText.classList.add("product-text", "mt-4");

  // Append the HTML elements in the product details
  productLeft.appendChild(productImage);
  productTop.appendChild(productName);
  productTop.appendChild(productPrice);
  productTop.appendChild(productText);
}

fetchTeddy(id);