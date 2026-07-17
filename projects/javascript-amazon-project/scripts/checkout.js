import {cart, removeFromCart, calculateCartQuantity, updateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/daliveryOptions.js';

let checkoutHTML = '';

cart.forEach((item) => {
  let matchingProduct = '';
  
  products.forEach((product) => {
    if (item.productId === product.id) {
      matchingProduct = product;
    }
  });
  
  const deliveryOptionId = item.deliveryOptionId;
  
  let deliveryOption = '';
  
  deliveryOptions.forEach((option) => {
    if (deliveryOptionId === option.id) {
      deliveryOption = option;
    }
  });
  
  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'
  );
  const dateString = deliveryDate.format('dddd, MMMM D');
  
  checkoutHTML += `
    <div class="cart-item-container cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}">${item.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary" data-product-id='${matchingProduct.id}'>
              Update
            </span>
            <input class="quantity-input quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary" data-product-id='${matchingProduct.id}'>
              Save
            </span>
            <span class="delete-quantity-link link-primary" data-product-id='${matchingProduct.id}'>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, item)}
          </div>
        </div>
      </div>
    </div>
  `;
});

function deliveryOptionsHTML(matchingProduct, item) {
  let html = '';
  
  deliveryOptions.forEach((deliveryOptions) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOptions.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');
    
    const priceString = deliveryOptions.priceCents
      ? `$${formatCurrency(deliveryOptions.priceCents)} -`
      : 'FREE';
    
    const isChecked = deliveryOptions.id === item.deliveryOptionId;
    
    html += `
      <div class="delivery-option">
        <input type="radio" ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
  });
  
  return html;
}

document.querySelector('.order-summary').innerHTML = checkoutHTML;

document.querySelectorAll('.delete-quantity-link')
  .forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      removeFromCart(productId);
      
      const container = document.querySelector(`.cart-item-container-${productId}`);
      container.remove();
      
      displayItemQuantity();
    });
  });
  
document.querySelectorAll('.update-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      
      const container = document.querySelector(`.cart-item-container-${productId}`);
      
      container.classList.add('is-editing-quantity');
      
      displayItemQuantity();
    });
  });

document.querySelectorAll('.save-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      
      const container = document.querySelector(`.cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
      
      const quantityInput = document.querySelector(`.quantity-input-${productId}`);
      let newQuantity = Number(quantityInput.value);
      
      if (newQuantity <= 0) {
        newQuantity = 1;
      } else if (newQuantity >= 1000) {
        newQuantity = 999;
      }
      
      updateCartQuantity(productId, newQuantity);
      
      const quantityLabel = document.querySelector(`.quantity-label-${productId}`);
      quantityLabel.innerHTML = String(newQuantity);
      
      updatePaymentSummary()
      
      displayItemQuantity();
    });
  });

displayItemQuantity();

function displayItemQuantity() {
  document.querySelector('.return-to-home-link').innerText = calculateCartQuantity() ? `${calculateCartQuantity()} items` : `0 item`;
}

function addTotalCartItem() {
  let sum = 0;
  
  cart.forEach((cartItem) => {
    products.forEach((productItem) => {
      if (cartItem.productId === productItem.id) {
        sum += cartItem.quantity * productItem.priceCents;
      }
    });
  });
  
  return (sum / 100).toFixed(2);
}

updatePaymentSummary();

function updatePaymentSummary() {
  document.querySelector('.payment-summary-money').innerHTML = `$${addTotalCartItem()}`;
  
}