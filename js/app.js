/* eslint-disable no-inner-declarations */
'use strict';
//get container
let containerElement = document.getElementById('container1');
// console.log(containerElement);

let namesArr=[];
let votesArr=[];
let shownArr=[];
//create constructor
function Product(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.shown = 0;

  Product.allProducts.push(this);
  namesArr.push(this.name);
  // votesArr.push(this.votes);
  // shownArr.push(this.shown);
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


// console.log(Product.allProducts);
function storeData() {

  let shownArrString= JSON.stringify(Product.allProducts);
  // let votesArrString= JSON.stringify(votesArr);

  let dataStoraged=localStorage.setItem('shown',shownArrString);
  // localStorage.setItem('votes',votesArrString);

}

function getStoredData() {

  let shownArrData= localStorage.getItem('shown');
  // let votesArrData=localStorage.getItem('votes');


  //  let dataVotes= JSON.parse('votes');
  // console.log('datasown from function getstoreddata ===! null is',dataShown);
  if (shownArrData !== null) {
    let dataShown=JSON.parse(shownArrData);
    Product.allProducts=dataShown;
    console.log('i am from if');

  }


}


//create random number of each image
function getRandomNumber() {
  return Math.floor(Math.random() * Product.allProducts.length);

}
// console.log(getRandomNumber());

//define three images, and give them a random number
let leftImage;
let middleImage;
let rightImage;

let leftImageIndex;
let middleImageIndex;
let rightImageIndex;

let indexArray=[];
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


  // console.log('indexArray.includes(middleImageIndex)',indexArray.includes(middleImageIndex));

  // console.log('index array befor while loop', indexArray);

  while (leftImage.src === middleImage.src || middleImage.src === rightImage.src || rightImage.src === leftImage.src || indexArray.includes(leftImageIndex)|| indexArray.includes(middleImageIndex) || indexArray.includes(rightImageIndex) ) {
    leftImageIndex = getRandomNumber();
    leftImage.src = Product.allProducts[leftImageIndex].source;
    // Product.allProducts[leftImageIndex].shown++;

    middleImageIndex = getRandomNumber();
    middleImage.src = Product.allProducts[middleImageIndex].source;
    // Product.allProducts[middleImageIndex].shown++;

    rightImageIndex = getRandomNumber();
    rightImage.src = Product.allProducts[rightImageIndex].source;
    // Product.allProducts[middleImageIndex].shown++;

  }


  indexArray=[];
  indexArray.push(leftImageIndex,middleImageIndex,rightImageIndex);
  // console.log('index array after while loop', indexArray);

  Product.allProducts[leftImageIndex].shown++;
  Product.allProducts[middleImageIndex].shown++;
  Product.allProducts[rightImageIndex].shown++;

  // shownArr.push(Product.allProducts[rightImageIndex].shown);



  // console.log('shown from left', Product.allProducts[leftImageIndex].shown);
  // console.log('shown from middle', Product.allProducts[middleImageIndex].shown);
  // console.log('shown from right', Product.allProducts[rightImageIndex].shown);

}

renderImages();

//add eventlistner
containerElement.addEventListener('click', selectRandomImage);

let maxClicks = 25;
let minClicks = 0;

// let mainArrayIndex=[];
function selectRandomImage(event) {

  //  mainArrayIndex.push(indexArray)
  //  console.log('main array index',mainArrayIndex);
  // event.target.id;
  // console.log('id', event.target.id);
  // console.log('index array from the event listner', renderImages.indexArray);


  // if (event.target.id === 'left-img' || event.target.id === 'middle-img' || event.target.id === 'right-img') {

  minClicks++;
  if (minClicks <= maxClicks) {

    if (event.target.id === 'left-img') {
      Product.allProducts[leftImageIndex].votes++;
      // console.log('voting from left', Product.allProducts[leftImageIndex].votes);
      // console.log('helloo from if');

    } if (event.target.id === 'middle-img') {
      Product.allProducts[middleImageIndex].votes++;
      // console.log('voting from middle', Product.allProducts[middleImageIndex].votes);

    } if (event.target.id === 'right-img') {
      Product.allProducts[rightImageIndex].votes++;
      // console.log('voting from right', Product.allProducts[rightImageIndex].votes);
    }

    renderImages();

    storeData();
    // console.log('product.all products for each click=',Product.allProducts);

  }

  if(minClicks > maxClicks){

    let buttonContainer = document.getElementById('buttoncontainer');
    let buttonElement = document.createElement('button');
    buttonElement.id='button';
    buttonContainer.appendChild(buttonElement);
    buttonElement.textContent='see results';
    // console.log('i am from else', buttonElement);
    buttonElement = document.getElementById('button');

    buttonElement.addEventListener('click', renderList);
    function renderList(event2) {
      // console.log('event2 id', event2.target.id);
      if (event2.target.id === 'button') {

        let unorderedList = document.getElementById('ul');

        for (let i = 0; i < Product.allProducts.length; i++) {
          let list = document.createElement('li');
          unorderedList.appendChild(list);
          list.textContent = `${Product.allProducts[i].name} had ${Product.allProducts[i].votes} votes, and was seen ${Product.allProducts[i].shown} times.`;
        }
        for (let i = 0; i < Product.allProducts.length; i++) {
          shownArr.push(Product.allProducts[i].shown);
          votesArr.push(Product.allProducts[i].votes);

        }



      }
      chart();
      buttonElement.removeEventListener('click', renderList);

    }
    containerElement.removeEventListener('click', selectRandomImage);
  }

}


// }


// }


// console.log('minimum', minClicks);
// console.log('maximum', maxClicks);



// chart.js
function chart() {
  let ctx = document.getElementById('myChart').getContext('2d');

  let chart= new Chart(ctx,{
  // what type is the chart
    type: 'bar',

    //  the data for showing
    data:{
      //  for the names
      labels: namesArr,

      datasets: [
        {
          label: ' product votes',
          data: votesArr,
          backgroundColor: [
            'rgb(251, 93, 76)',
          ],

          borderWidth: 1
        },

        {
          label: 'product shown',
          data: shownArr,
          backgroundColor: [
            'black',
          ],

          borderWidth: 1
        }

      ]
    },
    options: {}
  });

}




// console.log('shown',shownArr);
// console.log('votes',votesArr);

// console.log('product.allproducts =',Product.allProducts);
getStoredData();

//finished the project


