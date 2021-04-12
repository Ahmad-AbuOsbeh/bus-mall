/* eslint-disable no-inner-declarations */
'use strict';
//get container
let containerElement = document.getElementById('container1');
console.log(containerElement);

//create constructor
function Product(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.shown = 0;

  Product.allProducts.push(this);
}

//create array to store all objects
Product.allProducts = [];

//create objects

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');


console.log(Product.allProducts);

//create random number of each image
function getRandomNumber() {
  return Math.floor(Math.random() * Product.allProducts.length);

}
console.log(getRandomNumber());

//define three images, and give them a random number
let leftImage;
let middleImage;
let rightImage;

let leftImageIndex;
let middleImageIndex;
let rightImageIndex;
function renderImages() {

  leftImage = document.getElementById('left-img');
  middleImage = document.getElementById('middle-img');
  rightImage = document.getElementById('right-img');

  //give source for the left image
  leftImageIndex = getRandomNumber();
  leftImage.src = Product.allProducts[leftImageIndex].source;

  // console.log('leftImage',leftImage);

  //give source for the middle image
  middleImageIndex = getRandomNumber();
  middleImage.src = Product.allProducts[middleImageIndex].source;

  //give source for the right image
  rightImageIndex = getRandomNumber();
  rightImage.src = Product.allProducts[rightImageIndex].source;

  while (leftImage.src === middleImage.src || middleImage.src === rightImage.src || rightImage.src === leftImage.src) {
    leftImageIndex = getRandomNumber();
    leftImage.src = Product.allProducts[leftImageIndex].source;
    // Product.allProducts[leftImageIndex].shown++;

    middleImageIndex = getRandomNumber();
    middleImage.src = Product.allProducts[middleImageIndex].source;
    // Product.allProducts[middleImageIndex].shown++;

  }
  Product.allProducts[leftImageIndex].shown++;
  Product.allProducts[middleImageIndex].shown++;
  Product.allProducts[rightImageIndex].shown++;


  console.log('shown from left', Product.allProducts[leftImageIndex].shown);
  console.log('shown from middle', Product.allProducts[middleImageIndex].shown);
  console.log('shown from right', Product.allProducts[rightImageIndex].shown);

}

renderImages();

//add eventlistner
containerElement = addEventListener('click', selectRandomImage);

let maxClicks = 25;
let minClicks = 0;


function selectRandomImage(event) {
  // event.target.id;
  console.log('id', event.target.id);
  if (event.target.id === 'left-img' || event.target.id === 'middle-img' || event.target.id === 'right-img') {

    minClicks++;
    if (minClicks <= maxClicks) {

      if (event.target.id === 'left-img') {
        Product.allProducts[leftImageIndex].votes++;
        console.log('voting from left', Product.allProducts[leftImageIndex].votes);
        // console.log('helloo from if');

      } if (event.target.id === 'middle-img') {
        Product.allProducts[middleImageIndex].votes++;
        console.log('voting from middle', Product.allProducts[middleImageIndex].votes);

      } if (event.target.id === 'right-img') {
        Product.allProducts[rightImageIndex].votes++;
        console.log('voting from right', Product.allProducts[rightImageIndex].votes);
      }
      renderImages();


    }

    if(minClicks >= maxClicks){

      let buttonContainer = document.getElementById('buttoncontainer');
      let buttonElement = document.createElement('button');
      buttonElement.id='button';
      buttonContainer.appendChild(buttonElement);
      buttonElement.textContent='see results';
      console.log('i am from else', buttonElement);
      buttonElement = document.getElementById('button');

      buttonElement = addEventListener('click', renderList);
      function renderList(event2) {
        console.log('event2 id', event2.target.id);
        if (event2.target.id === 'button') {

          let unorderedList = document.getElementById('ul');

          for (let i = 0; i < Product.allProducts.length; i++) {
            let list = document.createElement('li');
            unorderedList.appendChild(list);
            list.textContent = `${Product.allProducts[i].name} had ${Product.allProducts[i].votes} votes, and was seen ${Product.allProducts[i].shown} times.`;
          }



        }buttonElement.removeEventListener('click', renderList);
      }

    }containerElement.removeEventListener('click', selectRandomImage);
  }

}


console.log('minimum', minClicks);
console.log('maximum', maxClicks);



