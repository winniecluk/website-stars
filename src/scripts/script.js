console.log('okay');

var stars = [];

var canvas = new fabric.Canvas('star-system');

canvas.setWidth('98%', {
  cssOnly: true
});
canvas.setHeight('96%', {
  cssOnly: true
});
// canvas.setZoom(0.5);

var imgEl = document.getElementById('star-red');
var imgInstance = new fabric.Image.fromURL('images/star-red.png', function(oImg){
    canvas.add(oImg);

  });
// canvas.setBackgroundColor('black');



// var rect = new fabric.Rect({
//   left: 0
//   , top: 50
//   , fill: 'red'
//   , width: 300
//   , height: 300
// });
// canvas.add(rect);

// var colors = [
//   'red'
//   , 'green'
//   , 'blue'
// ];
// var w = document.documentElement.clientWidth;
// var h = document.documentElement.clientHeight;
// var limit = Math.max(
//   Math.ceil( ((w / 2) * (h / 2)) / 10 ),
//     10
// );

// console.log(w);
// console.log(h);
// console.log('this is the limit: ' + limit);

// this.requestAnimationFrame = window.requestAnimationFrame ||
// 		window.mozRequestAnimationFrame ||
// 		window.webkitRequestAnimationFrame ||
// 		window.msRequestAnimationFrame ||
// 		window.oRequestAnimationFrame || function(callback) {
// 		window.setTimeout(callback, 1 / 60 * 1000);
// };

// function randomize(num){
//   return Math.floor(Math.random() * num);
// }

// function coinFlip(){
//   return Math.round(Math.random()) ? true : false;
// }

// function init(){
//   for (let i = 0; i < limit; i++){
//     stars.push( new Star(randomPosition(w,h), coinFlip(), colors[randomize(colors.length)], 1) );
//   }
// }

// function randomPosition(w, h){
//   return {
//     x: randomize(w),
//     y: randomize(h)
//   }
// }

// function Star(positionObj, bobble = false, color = white, speed){
//   this.position = positionObj;
//   this.bobble = bobble;
//   this.color = color;
// }

// Star.prototype.bobble = function(dt){
// }

// // core

// // get canvas rendering context
// function setContext(){
//   const canvas = document.getElementById('star-system');
//   if (canvas.getContext){
//     const context = canvas.getContext('2d');
//   }
// }
