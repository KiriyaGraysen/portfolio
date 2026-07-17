export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];  
}


function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  const quantity = Number(document.querySelector(`.quantity-selector-${productId}`).value);
  
  // check if there's already existing productId to cart lis
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  
  // add 1 quantity if there's a match
  if (matchingItem) {
    matchingItem.quantity += quantity;
    
  // add cart object if no match
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }
  
  saveToLocalStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })
  
  cart = newCart;
  saveToLocalStorage();
}

export function updateCartQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      if (newQuantity > 0 && newQuantity < 1000) {
        cartItem.quantity = newQuantity;
      }
    }
  });
  
  saveToLocalStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  
  return cartQuantity;
}