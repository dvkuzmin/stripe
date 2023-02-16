// "use strict";


let buyButton = document.querySelector('.buy-button');
let itemName = document.querySelector('.item-name > p');
let itendescription = document.querySelector('.item-description > p');
let itemPrice = document.querySelector('.item-price > p');
let body = document.body;
let itemsUrl = 'items/'

fetch(itemsUrl).then(response => response.json()).then(data => renderItems(data));

renderItems  = (data) => {
   mainDiv = document.createElement('div');
   mainDiv.className = 'items-container';
   for (let item of data) {
      let name = item.name;
      let price = item.price;
      let itemDiv = document.createElement('div');
      itemDiv.className = 'item-container';
      let nameDiv = document.createElement('div');
      nameDiv.className = 'item-name';
      let priceDiv = document.createElement('div');
      priceDiv.className = 'item-price';
      nameDiv.innerHTML = `<h2>${name}</h2>`;
      priceDiv.innerHTML = `<p>Price: ${price} USD</p>`;
      let detailButton = document.createElement('button');
      detailButton.id = item.id;
      detailButton.className = 'button';
      detailButton.innerText = 'Description';
      detailButton.addEventListener('click', getItem);
      // itemDiv.id = item.id;
      // itemDiv.addEventListener('click', getItem);
      itemDiv.append(nameDiv, priceDiv, detailButton);
      mainDiv.append(itemDiv);
   }

   body.append(mainDiv);
}

getItem = (event) => {
   let itemUrl = `items/${event.target.id}/`;
   fetch(itemUrl).then(response => response.json()).then(data => renderItem(data));
}


renderItem = (item) => {
   body.innerHTML = '';
   let name = item.name;
   let desc = item.description;
   let price = item.price;
   mainDiv = document.createElement('div');
   mainDiv.className = 'items-container';
   let itemDiv = document.createElement('div');
   itemDiv.className = 'item-container';
   let nameDiv = document.createElement('div');
   nameDiv.className = 'item-name';
   let descDiv = document.createElement('div');
   descDiv.className = 'item-description';
   let priceDiv = document.createElement('div');
   priceDiv.className = 'item-price';
   nameDiv.innerHTML = `<p>${name}</p>`;
   descDiv.innerHTML = `<p>${desc}</p>`;
   priceDiv.innerHTML = `<p>Price: ${price} USD</p>`;
   let buyButton = document.createElement('button');
   buyButton.id = item.id;
   buyButton.className = 'button';
   buyButton.innerHTML = 'Buy';
   buyButton.addEventListener('click', buyItem);
   itemDiv.append(nameDiv, descDiv, priceDiv, buyButton);
   mainDiv.append(itemDiv);
   body.append(mainDiv);
}

buyItem = (event) => {
   let buyUrl = `buy/${event.target.id}/`;
   fetch(buyUrl).then(response => response.json()).then(data => stripeRedirect(data));
}


stripeRedirect = (data) => {
   let stripe = Stripe('pk_test_51Manx5LWBBWkbr9D91C3yuCZTq5TYVdUxzGRyoOjILgaNsZqshHKEe3NPkowFvTG1uwmXsUrhs7B9c4rxpOYrQLa001gDSXZV5');
   console.log(data.session_id);
   console.log(stripe);
   stripe.redirectToCheckout({ sessionId: data.session_id });
}

 getData = () => {
    
    let res = fetch(url)
 }
