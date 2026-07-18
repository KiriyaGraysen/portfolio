function Cart(localStorageKey) {
  const cart = {
    cartItem: undefined,
    
    loadFromStorage() {
      this.cartItem = JSON.parse(localStorage.getItem(localStorageKey));
      
      if (!this.cartItem) {
        this.cartItem = [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }];  
      }
    },
    
    saveToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItem));
    },
    
    addToCart(productId) {
      const quantity = Number(document.querySelector(`.quantity-selector-${productId}`).value);
      
      // check if there's already existing productId to cart lis
      let matchingItem;
      this.cartItem.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });
      
      // add 1 quantity if there's a match
      if (matchingItem) {
        matchingItem.quantity += quantity;
        
      // add cart object if no match
      } else {
        this.cartItem.push({
          productId,
          quantity,
          deliveryOptionId: '1'
        });
      }
      
      this.saveToLocalStorage();
    },
    
    removeFromCart(productId) {
      const newCart = [];
      
      this.cartItem.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      })
      
      this.cartItem = newCart;
      this.saveToLocalStorage();
    },
    
    updateCartQuantity(productId, newQuantity) {
      this.cartItem.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          if (newQuantity > 0 && newQuantity < 1000) {
            cartItem.quantity = newQuantity;
          }
        }
      });
      
      this.saveToLocalStorage();
    },
    
    calculateCartQuantity() {
      let cartQuantity = 0;
      
      this.cartItem.forEach((item) => {
        cartQuantity += item.quantity;
      });
      
      return cartQuantity;
    },
    
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem = '';
      
      this.cartItem.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });
      
      matchingItem.deliveryOptionId = deliveryOptionId;
      
      this.saveToLocalStorage();
    }
  };
  
  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);