//JS File
console.log("JS file connected");

// Define variables for the shopping cart and product list
let cart = [];
let products = [
  {
    id: 1,
    name: "Flavour 1",
    price: 4.99,
    image: "flavour1.jpg"
  },
  {
    id: 2,
    name: "Flavour 2",
    price: 4.99,
    image: "flavour2.jpg"
  },
  {
    id: 3,
    name: "Flavour 3",
    price: 4.99,
    image: "flavour3.jpg"
  },

  {
    id: 4,
    name: "Flavour 4",
    price: 4.99,
    image: "flavour4.jpg"
  }
];

// Function to add a product to the cart
function addToCart(productId) {
  // Find the product in the products array
  let product = products.find(item => item.id === productId);
  
  // Add the product to the cart
  cart.push(product);
  
  // Update the cart count in the UI
  updateCartCount();
}

// Function to remove a product from the cart
function removeFromCart(productId) {
  // Find the index of the product in the cart
  let index = cart.findIndex(item => item.id === productId);
  
  // Remove the product from the cart
  cart.splice(index, 1);
  
  // Update the cart count in the UI
  updateCartCount();
}

// Function to update the cart count in the UI
function updateCartCount() {
  let count = cart.length;
  document.getElementById("cart-count").textContent = count;
}

// Function to display the products in the UI
function displayProducts() {
  let productList = document.getElementById("product-list");
  
  // Loop through the products array and create a card for each product
  products.forEach(product => {
    let card = document.createElement("div");
    card.classList.add("card");
    
    let image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    card.appendChild(image);
    
    let name = document.createElement("h2");
    name.textContent = product.name;
    card.appendChild(name);
    
    let price = document.createElement("p");
    price.textContent = "$" + product.price.toFixed(2);
    card.appendChild(price);
    
    let button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.addEventListener("click", function() {
      addToCart(product.id);
    });
    card.appendChild(button);
    
    productList.appendChild(card);
  });
}

// Function to display the cart in the UI
function displayCart() {
  let cartList = document.getElementById("cart-list");
  
  // Clear the cart list
  cartList.innerHTML = "";
  
  // Loop through the cart array and create a row for each product
  cart.forEach(product => {
    let row = document.createElement("tr");
    
    let name = document.createElement("td");
    name.textContent = product.name;
    row.appendChild(name);
    
    let price = document.createElement("td");
    price.textContent = "$" + product.price.toFixed(2);
    row.appendChild(price);
    
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function() {
      removeFromCart(product.id);
    });
    
    let removeButtonCell = document.createElement("td");
    removeButtonCell.appendChild(removeButton);
    row.appendChild(removeButtonCell);
    
    cartList.appendChild(row);
  });
}

// Call the displayProducts function to display the products in the UI
displayProducts();
