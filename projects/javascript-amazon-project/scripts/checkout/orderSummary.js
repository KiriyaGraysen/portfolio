import { cart,
  removeFromCart, calculateCartQuantity, updateCartQuantity, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { formatDate } from '../utils/date.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
  let checkoutHTML = '';
  
  cart.forEach((item) => {
    const matchingProduct = getProduct(item.productId);
    
    const deliveryOptionId = item.deliveryOptionId;
    
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    
    checkoutHTML += `
      <div class="cart-item-container cart-item-container-${matchingProduct.id}">
        <div class="delivery-date delivery-date-${matchingProduct.id}">
          Delivery date: ${formatDate(deliveryOption)}
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
    
    deliveryOptions.forEach((deliveryOption) => {
      const priceString = deliveryOption.priceCents
        ? `$${formatCurrency(deliveryOption.priceCents)} -`
        : 'FREE';
      
      const isChecked = deliveryOption.id === item.deliveryOptionId;
      
      html += `
        <div class="delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${formatDate(deliveryOption)}
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
        
        renderOrderSummary();
        renderPaymentSummary();
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
        
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
  
  displayItemQuantity();
  
  function displayItemQuantity() {
    document.querySelector('.return-to-home-link').innerText = calculateCartQuantity() ? `${calculateCartQuantity()} items` : `0 item`;
  }
  
  document.querySelectorAll('.delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}

renderOrderSummary();