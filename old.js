console.log('okay');

var w = document.documentElement.clientWidth - 10;
var h = document.documentElement.clientHeight - 10;
console.log(w, h);
var imgScale;
var subtitleSize;
var imageObjs = [];
var shipObj;

switch(true){
  // <600 should be phone
  case w < 600:
    console.log('x-small');
    imgScale = 0.4;
    subtitleSize = 20;
    break;
  case w >= 600 && w < 900:
    console.log('small');
    imgScale = 0.6;
    subtitleSize = 20;
    break;
  case w >= 900 && w < 1200:
    console.log('med');
    imgScale = 0.8;
    subtitleSize = 26;
    break;
  case w >= 1200 && w < 1800:
    console.log('large');
    imgScale = 0.8;
    subtitleSize = 26;
    break;
  default:
    console.log('x-large');
    imgScale = 0.2;
    subtitleSize = 20;
}

var rectH = Math.floor(h/6);

var widthUnit = Math.floor(w / 12);

var breakpoint1 = widthUnit;
var breakpoint2 = widthUnit * 5;
var breakpoint3 = widthUnit * 9;

// 1200: 300 x 350
var canvas = new fabric.Canvas('star-system', {
  width: w,
  height: h
});

canvas.on('mouse:move', function(e){
  // console.log('here');
  // console.log();
  // console.log(e.e.clientY);
  if (shipObj){
    shipObj.setPositionByOrigin(new fabric.Point(e.e.clientX, h), 'center', 'bottom');

    canvas.renderAll();
  }
});

canvas.on('mouse:down', function(e){
  console.log('clicked');
  if (shipObj){
    var shipHeight = shipObj.get('height');

  }
});


function setImages(objList){
  objList.forEach(function(el, idx){
    setImage(el);
  })
}

setImage({
  name: 'ship'
  , path: 'assets/images/ship-white.png'
  , scale: imgScale
  , posX: w / 2
  , posY: h
  // , delay: 0
  , orientX: 'center'
  , orientY: 'bottom'
});

setImage({
  name: 'monster-red'
  , path: 'assets/images/monster-red.png'
  , scale: imgScale
  , posX: breakpoint1
  , posY: rectH * 3
  , delay: 1
  , text: 'story'
  , orientX: 'left'
  , orientY: 'bottom'
});

setImage({
  name: 'monster-green'
  , path: 'assets/images/monster-green.png'
  , scale: imgScale
  , posX: breakpoint2
  , posY: rectH * 3
  , delay: 0
  , text: 'projects'
  , orientX: 'left'
  , orientY: 'bottom'
});

setImage({
  name: 'monster-yellow'
  , path: 'assets/images/monster-yellow.png'
  , scale: imgScale
  , posX: breakpoint3
  , posY: rectH * 3
  , delay: 2
  , text: 'contact'
  , orientX: 'left'
  , orientY: 'bottom'
});



function setImage(obj){
  fabric.Image.fromURL(obj.path, function(i){
    i.scale(obj.scale)
      .setPositionByOrigin(new fabric.Point(obj.posX, obj.posY), obj.orientX, obj.orientY);
    imageObjs.push(i);
    if (obj.name === 'ship'){
      shipObj = i;
    }
    if (null != obj.delay){
      bobbleImage(i, 'top', '+=15', obj.delay);
    }
    canvas.add(i);
    if (obj.text){
      var caption = new fabric.Text(obj.text,
        { left: obj.posX
          , top: obj.posY
          , stroke: 'white'
          , fill: 'white'
          , fontFamily: 'Emulogic'
          , fontSize: subtitleSize
        });
      canvas.add(caption);
    }
  });
}

function bobbleImage(i, direction, magnitude, delay){
  setTimeout(function(){
    i.animate(direction, magnitude,
      {
        duration: 800,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function(){
          var change = magnitude.includes('+') ? magnitude.replace('+', '-') : magnitude.replace('-', '+');
          bobbleImage(i, 'top', change);
        }
      }
    );
  }, 300 * delay);
}
