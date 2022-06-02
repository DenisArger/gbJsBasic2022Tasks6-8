"use strict";

const basketCounterEl = document.querySelector('.cartIconWrap span'),
  basketTotalValueEl = document.querySelector('.basketTotalValue'),
  basketEl =  document.querySelector('.basket'),
  basketTotalEl = document.querySelector('.basketTotal');


document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
  if(!event.target.closest('.addToCart')){
    return;      
  }
  const featuredItem = event.target.closest('.featuredItem');
  const id = +featuredItem.dataset.id;
  const name = featuredItem.dataset.name;
  const price = +featuredItem.dataset.price;
  
  addToCart(id, name, price);
});

function addToCart(id, name, price) {
  if(!(id in basket)){
    basket[id] = { id, name, price, count: 0};
  }
  basket[id].count++;
  basketCounterEl.textContent = getTotalBasketCount().toString();
  basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
  renderProductInBacket(id);
}

function getTotalBasketCount(){
  return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice(){
  return Object.values(basket)
    .reduce((acc,product) => acc + product.count * product.price, 0);    
}

function renderProductInBacket(id){
  const basketRowEl = basketEl
  .querySelector(`.basketRow[data-id="${id}"]`);
if (!basketRowEl) {
  renderNewProductInBasket(id);
  return;
}


const product = basket[id];
basketRowEl.querySelector('.productCount').textContent = product.count;
basketRowEl
  .querySelector('.productTotalRow')
  .textContent = (product.price * product.count).toFixed(2);
}

function renderNewProductInBasket(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
  }