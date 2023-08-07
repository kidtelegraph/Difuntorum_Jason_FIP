document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.querySelector(".cart-icon");
    const cartCount = document.querySelector(".cart-count");
    const cartModel = document.querySelector(".cart-model");
    const closeCartButton = document.querySelector(".close-cart");
    const closeOrder = document.querySelector(".close-order");
    const productContainer = document.getElementById("product-list");
    const cartList = document.getElementById("cart-items");
    const totalElement = document.querySelector(".total");
    const checkoutButton = document.querySelector(".checkout-button");
    const orderModel = document.querySelector(".order-model");
    const placeOrderButton = document.querySelector(".place-order-button");
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const regionInput = document.getElementById("region");
    const companyInput = document.getElementById("company");
    const addressInput = document.getElementById("address");
    const phoneInput = document.getElementById("phone");
  
    cartIcon.addEventListener("click", () => {
      cartModel.style.display = "block";
    });
  
    closeCartButton.addEventListener("click", () => {
      cartModel.style.display = "none";
    });
  
    let currentTotal = 0;
    const cartItems = [];
  
    const products = [{
        title: "The Athlete",
        price: 7.99,
        image: "images/mobile-img/mobile_shop_f1.jpg",
        gif: "images/grapes.gif"
      },
      {
        title: "The Nerd",
        price: 7.99,
        image: "images/mobile-img/mobile_shop_f2.jpg",
        gif: "images/orange.gif"
      },
      {
        title: "The Gamer",
        price: 7.99,
        image: "images/mobile-img/mobile_shop_f3.jpg",
        gif: "images/lemon.gif"
      },
      {
        title: "The Outcast",
        price: 7.99,
        image: "images/mobile-img/mobile_shop_f4.jpg",
        gif: "images/peach.gif"
      },
      {
        title: "Chill 4 Pack",
        price: 29.99,
        image: "images/mobile-img/mobile_shop_pack4.jpg"
      },
      {
        title: "The Legends 6 Pack",
        price: 29.99,
        image: "images/mobile-img/mobile_shop_pack6.jpg"
      },
    ];
  
    products.forEach((product, index) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");
      productElement.innerHTML = `
        <span class="product-title">${product.title}</span>
        <span class="product-price">$${product.price}</span>
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <gif src="${product.gif}" alt="${product.gif}" class="product-gif">
        <button class="add-to-cart btn btn-primary" data-index="${index}">Add to Cart</button>
      `;
      productContainer.appendChild(productElement);
    });
  
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", addToCart);
    });
  
    function addToCart(event) {
      const index = event.target.dataset.index;
      const product = products[index];
      const title = product.title;
      const price = product.price;
      const quantity = 1;
      const image = product.image;
  
      const existingCartItem = cartItems.find(item => item.index === index);
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
  
        const cartItemElement = cartList.querySelector(`[data-index="${index}"]`);
        cartItemElement.querySelector(".cart-item-quantity").innerText = existingCartItem.quantity;
        cartItemElement.querySelector(".cart-item-price").innerText = `$${price * existingCartItem.quantity}`;
      } else {
        cartItems.push({
          index,
          title,
          price,
          quantity
        });
  
        const cartItem = document.createElement("li");
        cartItem.dataset.index = index;
        cartItem.innerHTML = `
          <span class="cart-item-title">${title}</span>
          <img src="${image}" alt="${title}" class="cart-item-image">
          <span class="cart-item-quantity count-number">${quantity}</span>
          <span class="cart-item-price">$${price * quantity}</span>
          <button class="change-quantity btn" data-change="-1">-</button>
          <button class="change-quantity btn" data-change="1">+</button>
          <button class="remove-from-cart btn btn-danger">Delete</button>
        `;
        cartList.appendChild(cartItem);
  
        const changeQuantityButtons = cartItem.querySelectorAll(".change-quantity");
        changeQuantityButtons.forEach((button) => {
          button.addEventListener("click", changeQuantity);
        });
  
        const removeFromCartButton = cartItem.querySelector(".remove-from-cart");
        removeFromCartButton.addEventListener("click", removeFromCart);
      }
  
      currentTotal += price;
      updateTotal();
      updateCartCount();
    }
  
    function updateTotal() {
      totalElement.innerText = `Total: $${currentTotal.toFixed(2)}`;
    }
  
    function updateCartCount() {
      const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      cartCount.innerText = totalCount;
    }
  
    function changeQuantity(event) {
      const button = event.target;
      const cartItem = button.parentElement;
      const index = cartItem.dataset.index;
      const product = products[index];
      const price = product.price;
      const changeValue = parseInt(button.dataset.change);
  
      const cartItemData = cartItems.find(item => item.index === index);
      let quantity = cartItemData.quantity + changeValue;
      if (quantity < 1) {
        quantity = 1;
      }
  
      const totalPrice = price * quantity;
      cartItem.querySelector(".cart-item-quantity").innerText = quantity;
      cartItem.querySelector(".cart-item-price").innerText = `$${totalPrice}`;
  
      currentTotal += (totalPrice - (price * cartItemData.quantity));
      cartItemData.quantity = quantity;
  
      updateTotal();
      updateCartCount();
    }
  
    function removeFromCart(event) {
      const button = event.target;
      const cartItem = button.parentElement;
      const index = cartItem.dataset.index;
      const product = products[index];
      const price = product.price;
  
      const cartItemData = cartItems.find(item => item.index === index);
      const quantity = cartItemData.quantity;
  
      currentTotal -= price * quantity;
  
      cartItem.remove();
      cartItems.splice(cartItems.indexOf(cartItemData), 1);
      updateTotal();
      updateCartCount();
    }
  
    checkoutButton.addEventListener("click", () => {
      cartModel.style.display = "none";
      orderModel.style.display = "block";
    });
  
    closeOrder.addEventListener("click", () => {
      orderModel.style.display = "none";
    });
  
    placeOrderButton.addEventListener("click", () => {
      const orderData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        region: regionInput.value,
        company: companyInput.value,
        address: addressInput.value,
        phone: phoneInput.value,
        items: cartItems
      };
  
      localStorage.setItem("orderData", JSON.stringify(orderData));
  
      cartItems.length = 0;
      cartList.innerHTML = "";
      currentTotal = 0;
      updateTotal();
      updateCartCount();
  
      orderModel.style.display = "none";
      
      alert("Order placed! Thank you for your purchase.");
    });
  });
  