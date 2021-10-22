function displayOrderConfirmation() {
  let order = JSON.parse(localStorage.getItem("orn:order"));

  // Get HTML element that contains confirmation order message
  let orderConfirmation = document.querySelector(".confirmation-box");

  // Create HTML elements for the confirmation order
  let orderConfirmationIcon = document.createElement("i");
  let orderConfirmationTitle = document.createElement("h2");
  let orderConfirmationMessage = document.createElement("p");
  let orderConfirmationDetailsTitle = document.createElement("h3");
  let orderConfirmationDetailsList = document.createElement("ul");
  let orderConfirmationOrderNumber = document.createElement("li");
  let orderConfirmationOrderPrice = document.createElement("li");
  let orderConfirmationButton = document.createElement("a");

  // Set the related attribute values to the HTML elements
  orderConfirmationTitle.innerHTML = "Merci, " + order.contact.firstName + ", pour votre achat !<br>Votre commande a bien été enregistrée !<br><i class='far fa-heart'></i>";
  orderConfirmationMessage.innerHTML = "Un mail de confirmation vient d'être envoyé à <strong>" + order.contact.email + "</strong>.";
  orderConfirmationDetailsTitle.textContent = "Récapitulatif de votre commande :";
  orderConfirmationOrderNumber.innerHTML = "Numéro de commande : <strong>" + order.orderId + "</strong>.";
  orderConfirmationOrderPrice.innerHTML = "Montant de votre commande : <strong>" + order.total + "</strong>.";
  orderConfirmationButton.href = "index.html";
  orderConfirmationButton.textContent = "Continuer mon shopping";

  // Style the confirmation order message by adding CSS/Bootstrap classes to the HTML elements
  orderConfirmationIcon.classList.add("fas", "fa-paper-plane", "mt-2");
  orderConfirmationTitle.classList.add("confirmation-title", "mt-4", "h3");
  orderConfirmationMessage.classList.add("confirmation-message", "mt-2");
  orderConfirmationDetailsTitle.classList.add("confirmation-details", "mt-3", "h5");
  orderConfirmationDetailsList.classList.add("p-0");
  orderConfirmationOrderNumber.classList.add("m-0");
  orderConfirmationOrderPrice.classList.add("m-0");
  orderConfirmationButton.classList.add("pink-button", "mt-4", "mx-auto");

  // Append the HTML elements in the order confirmation message
  orderConfirmation.appendChild(orderConfirmationIcon);
  orderConfirmation.appendChild(orderConfirmationTitle);
  orderConfirmation.appendChild(orderConfirmationMessage);
  orderConfirmation.appendChild(orderConfirmationDetailsTitle);
  orderConfirmation.appendChild(orderConfirmationDetailsList);
  orderConfirmationDetailsList.appendChild(orderConfirmationOrderNumber);
  orderConfirmationDetailsList.appendChild(orderConfirmationOrderPrice);
  orderConfirmation.appendChild(orderConfirmationButton);
}

function clearOrder() {
  localStorage.setItem("orn:order", "[]");
}

displayOrderConfirmation();
clearOrder();