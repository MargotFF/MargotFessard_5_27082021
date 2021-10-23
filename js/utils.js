function displayProductNotFoundPage() {
	document.querySelector(".teddy").hidden = true;
	document.querySelector(".product-not-found").hidden = false;
	document.querySelector(".not-found-icon-credit").hidden = false;
}

function displayErrorPage() {
	document.querySelector(".teddy").hidden = true;
	document.querySelector(".product-error").hidden = false;
	document.querySelector(".error-icon-credit").hidden = false;
}