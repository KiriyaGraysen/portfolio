export let cart = [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }
  ];

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
      quantity
    });
  }
}

export function removeFromCart(productId) {
  const newCart = [];
  
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })
  
  cart = newCart;
}