let cart = JSON.parse(localStorage.getItem("orn:cart"));

// Display empty/filled cart
function emptyCartDisplay() {
  const localStorageContent = localStorage.getItem("orn:cart");
  if (localStorageContent === null || localStorageContent === "[]" || localStorageContent === undefined || localStorageContent === "{}") {
    document.querySelector(".empty-cart").hidden = false;
    document.querySelector(".cart").hidden = true;
  } else {
    document.querySelector(".empty-cart").hidden = true;
  }
}

// Get added product to cart
function getCartItem(i) {

  // Get HTML element that contains added products in the cart
  let cartItems = document.querySelector(".cart-items");

  // Create HTML elements for each added product to the cart
  let cartItemRow = document.createElement("div");
  let cartItem = document.createElement("div");
  let cartItemLink = document.createElement("a");
  let cartItemImage = document.createElement("img");
  let cartItemName = document.createElement("h3");
  let cartItemQuantity = document.createElement("div");
  let cartItemIncreaseQuantity = document.createElement("button");
  let cartItemDecreaseQuantity = document.createElement("button");
  let cartItemTotalQuantity = document.createElement("div");
  let cartItemTotal = document.createElement("div");
  let cartItemPrice = document.createElement("div");
  let cartItemRemove = document.createElement("button");

  // Set the related attribute values to the HTML elements
  cartItemLink.href = "product.html?id=" + cart[i]._id;
  cartItemImage.src = cart[i].imageUrl;
  cartItemName.textContent = cart[i].name;
  cartItemPrice.textContent = (cart[i].price/100) + " €";
  cartItemIncreaseQuantity.textContent = "+";
  cartItemDecreaseQuantity.textContent = "-";
  cartItemTotalQuantity.textContent = cart[i].quantity;
  cartItemPrice.textContent = (cart[i].price * cart[i].quantity) + " €";
  cartItemRemove.textContent = "Retirer du panier";

  // Style the added product(s) by adding CSS/Bootstrap classes to the HTML elements
  cartItemRow.classList.add("row", "mb-4", "item-row");
  cartItem.classList.add("col-4", "cart-product");
  cartItemImage.classList.add("cart-img", "mr-3");
  cartItemName.classList.add("m-0", "h6");
  cartItemQuantity.classList.add("col-4", "cart-quantity");
  cartItemIncreaseQuantity.classList.add("quantity-btn");
  cartItemDecreaseQuantity.classList.add("quantity-btn");
  cartItemTotalQuantity.classList.add("quantity-total", "mx-3");
  cartItemTotal.classList.add("col-4", "cart-price");
  cartItemPrice.classList.add("cart-amount");
  cartItemRemove.classList.add("btn-remove", "cart-remove-item-btn");

  // Set DOM ids
  cartItemRow.id = "teddy-" + cart[i]._id;
  // cartItemIncreaseQuantity.id = "btn-increase-quantity-" + i;
  cartItemIncreaseQuantity.setAttribute("dom-id", cart[i]._id);
  // cartItemDecreaseQuantity.id = "btn-decrease-quantity-" + i;
  cartItemDecreaseQuantity.setAttribute("dom-id", cart[i]._id);
  cartItemTotalQuantity.id = "quantity-counter-" + cart[i]._id;
  // cartItemRemove.id = "btn-cart-remove-item-" + i;
  cartItemRemove.setAttribute("dom-id", cart[i]._id);
  cartItemPrice.id = "total-product-" + cart[i]._id;

  // Add event listeners : 
  // - Increase the quantity for an added product and update its price
  cartItemIncreaseQuantity.addEventListener("click", function (event) {
    const DOMItemId = event.currentTarget.getAttribute("dom-id");
    const DOMId = getIndex(DOMItemId);
    const quantityCounter = document.getElementById("quantity-counter-" + DOMItemId);
    const quantity = parseInt(quantityCounter.textContent);
    quantityCounter.textContent = quantity + 1;
    const cart = JSON.parse(localStorage.getItem("orn:cart"));
    cart[DOMId].quantity = quantity + 1;
    const totalProduct = document.getElementById("total-product-" + DOMItemId);
    const total = cart[DOMId].price * (quantity + 1);
    totalProduct.textContent = total + " €";
    localStorage.setItem("orn:cart", JSON.stringify(cart));
    cartTotalPrice();
  })

  // - Decrease the quantity for an added product and update its price
  cartItemDecreaseQuantity.addEventListener("click", function (event) {
    const DOMItemId = event.currentTarget.getAttribute("dom-id");
    const DOMId = getIndex(DOMItemId);
    const quantityCounter = document.getElementById("quantity-counter-" + DOMItemId);
    const quantity = parseInt(quantityCounter.textContent);
    const cart = JSON.parse(localStorage.getItem("orn:cart"));
    if ((quantity - 1) >= 1) {
      cart[DOMId].quantity = quantity - 1;
      quantityCounter.textContent = quantity - 1;
      const totalProduct = document.getElementById("total-product-" + DOMItemId);
      const total = cart[DOMId].price * (quantity - 1);
      totalProduct.textContent = total + " €";
    }
    localStorage.setItem("orn:cart", JSON.stringify(cart));
    cartTotalPrice();
  })

  // - Remove cart item
  cartItemRemove.addEventListener("click", function (event) {  
    const DOMItemId = event.currentTarget.getAttribute("dom-id");
    const DOMId = getIndex(DOMItemId);
    const cart = JSON.parse(localStorage.getItem("orn:cart"));
    cart.splice(DOMId, 1);
    const cartItemRowToRemove = document.getElementById("teddy-" + DOMItemId);
    cartItems.removeChild(cartItemRowToRemove);
    localStorage.setItem("orn:cart", JSON.stringify(cart));
    cartTotalPrice();
    emptyCartDisplay();
  })

  // - Clear cart
  let cartRemove = document.querySelector(".cart-remove-btn");
  cartRemove.addEventListener("click", function () {
    const teddies = JSON.parse(localStorage.getItem("orn:cart"));
    for (let i = 0; i < teddies?.length; i++) {
      document.getElementById("teddy-" + i)?.remove();
    }
    clearCart();
    emptyCartDisplay();
  })

  // Append the HTML elements in the cart
  cartItems.prepend(cartItemRow);
  cartItemRow.appendChild(cartItem);
  cartItemRow.appendChild(cartItemQuantity);
  cartItemRow.appendChild(cartItemTotal);
  cartItem.appendChild(cartItemImage);
  cartItem.appendChild(cartItemName);
  cartItemQuantity.appendChild(cartItemDecreaseQuantity);
  cartItemQuantity.appendChild(cartItemTotalQuantity);
  cartItemQuantity.appendChild(cartItemIncreaseQuantity);
  cartItemTotal.appendChild(cartItemPrice);
  cartItemTotal.appendChild(cartItemRemove);

  // Confirm and send order details : 
  let order = document.getElementById("confirm-order")
  // Add event listener to confirm the order in cart 
  order.addEventListener("click", function (event) {
    event.preventDefault();

    // Create the contact object
    let contact = {
      firstName: document.getElementById("inputFirstName").value,
      lastName: document.getElementById("inputLastName").value,
      address: document.getElementById("inputAddress").value,
      city: document.getElementById("inputCity").value,
      email: document.getElementById("inputEmail").value,
    }

    // Check if the form filled in by the user is valid
    const isFormValid = (
      isEmailValid(contact.email)
      || isEmpty(contact.firstName) 
      || isEmpty(contact.lastName)
      || isEmpty(contact.address)
      || isEmpty(contact.city)
      || isEmpty(contact.email)
    )

    if (isFormValid) {
      // Push the cart products in array (to send the order)
      let products = [];
      for (item of cart) {
        products.push(item._id);
      }
      
      // Send the order (POST request) containing the contact object and the products array
      fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          contact,
          products,
        })
      })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response failed");
        }
      })
      .then(function(order) {
        const totalOrder = document.querySelector(".total-amount").textContent;
        localStorage.setItem("orn:order", JSON.stringify({...order, total: totalOrder}));
        clearCart();
        window.location.href = "order.html";
      })
      .catch(function(err) {
        console.error(err)
      }); 
    } else {
      alert("Oups, le formulaire est incorrect... Pensez à bien renseigner et vérifier toutes vos informations afin de pouvoir valider votre commande.");
    }
  })
}

// Display added product(s) to cart
function displayCart() {
  for (let i = 0; i < cart?.length; i++) {
    getCartItem(i);
  }
  cartTotalPrice();
}

// Calculate and display the total price of the cart
function cartTotalPrice() {
  let cart = JSON.parse(localStorage.getItem("orn:cart"));
  let totalPrice = 0;

  if (cart?.length) {
    cart?.forEach(product => {
      totalPrice = totalPrice + (product.price * product.quantity);
    });
  }
  document.querySelector(".total-amount").innerHTML = totalPrice + " €";
}

// Clear the cart in local storage
function clearCart() {
  localStorage.setItem("orn:cart", "[]");
}

// Get the index of the product in localStorage
function getIndex(itemId) {
  const cart = JSON.parse(localStorage.getItem("orn:cart"));
  return cart.findIndex((item) => item._id === itemId);
}

// Check if the email field filled in by the user has a valid format
function isEmailValid(inputValue) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(inputValue) 
}

// Check if the fields have been filled in by the user
function isEmpty(inputValue) {
  return inputValue === "";
}

emptyCartDisplay();
displayCart();
