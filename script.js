var canvas;
var w = document.documentElement.clientWidth - 10;
var h = document.documentElement.clientHeight - 10;
var imgScale;
var subtitleSize;
var imageObjs = [];
var shipObj;
var bottomLimit;
var targetXLimits = [];
var particleSize;
var numberOfParticles = 30;
var rects = [
  []
  , []
  , []
];

var randomNumber = () => {
  return Math.random() * 15;
}

var randomColors = [
  '#DEDEDE'
  , '#FF0000'
  , '#F8FF00'
];

var directions = [
  {left: '-', top: ''}
  , {left: '-', top: '-'}
  , {left: '', top: '-'}

  , {left: '+', top: '-'}
  , {left: '+', top: ''}
  , {left: '+', top: '+'}

  , {left: '', top: '+'}
  , {left: '-', top: '+'}
];

function createRect(left, top, fillColor, width, height, index){
  var rect = new fabric.Rect({
    left: left,
    top: top,
    fill: fillColor,
    width: width,
    height: height
  });
  var idx = Math.floor(Math.random() * directions.length);
  rect.direction = directions[idx];
  rects[index].push(rect);
}

function moveRect(rect){
  canvas.add(rect);
  var direction = rect.direction;
  var factor = randomNumber();
  var left = rect.get('left').toString();
  var top = rect.get('top').toString();
  var l = rect.direction.left ? eval(left + direction.left + factor) : left;
  var t = rect.direction.top ? eval(top + direction.top + factor) : top;
  rect.set({
    left: l,
    top: t
  });
  canvas.renderAll();
}


function sizeWindow(){
  w = document.documentElement.clientWidth - 10;
  h = document.documentElement.clientHeight - 10;
  console.log(w, h);
  bottomLimit = Math.ceil(h * 1/2);
  imageObjs = [];
  targetXLimits = [];
  rects = [
    [],
    [],
    []
  ];
  switch(true){
    // <600 should be phone
    case w < 600:
      console.log('x-small');
      imgScale = 0.4;
      subtitleSize = 12;
      particleSize = 5;
      break;
    case w >= 600 && w < 900:
      console.log('small');
      imgScale = 0.6;
      subtitleSize = 20;
      particleSize = 8;
      break;
    case w >= 900 && w < 1200:
      console.log('med');
      imgScale = 0.8;
      subtitleSize = 26;
      particleSize = 10;
      break;
    case w >= 1200 && w < 1800:
      console.log('large');
      imgScale = 0.8;
      subtitleSize = 26;
      particleSize = 10;
      break;
    default:
      console.log('x-large');
      imgScale = 0.2;
      subtitleSize = 20;
      particleSize = 5;
  }
}

function renderImages(){
  var starSystem = document.querySelector('#star-system');
  var body = document.querySelector('body');
  if (starSystem){
    starSystem.parentNode.removeChild(starSystem);
    var newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('id', 'star-system');
    body.insertBefore(newCanvas, body.children[0]);
  }

  canvas = new fabric.Canvas('star-system', {
      width: w,
      height: h
  });

  canvas.on('mouse:move', function(e){
    if (shipObj){
      shipObj.setPositionByOrigin(new fabric.Point(e.e.clientX, h), 'center', 'bottom');
      canvas.renderAll();
    }
  });

  canvas.on('mouse:down', function(e){
    if (shipObj){
      var y = shipObj.get('top');
      var x = e.e.clientX;
      var startPoints = [
          {x: x, y: y}
          , {x: x, y: y - 20}
      ];
      var polyline = new fabric.Polyline(startPoints, {
        stroke: 'rgb(0,255,58)',
        strokeWidth: 5,
        selectable: false
      });
      canvas.add(polyline);

      fabric.util.animate({
        startValue: startPoints[0].y,
        endValue: 0,
        duration: 1 * 1000,
        onChange: function(value){
          polyline.setPositionByOrigin(new fabric.Point(x, value), 'center', 'bottom');
          var betweenX = false;
          var hitShip;
          var hitIndex;
          for (let i = 0; i < targetXLimits.length; i++){
            if (x >= targetXLimits[i].left
              && x <= targetXLimits[i].right
              ){
              betweenX = true;
              hitShip = targetXLimits[i];
              hitIndex = i;
            }
          }

          if (betweenX && Math.floor(value) <= bottomLimit){
            // console.log(imageObjs[hitIndex]);
            canvas.remove(imageObjs[hitIndex]);
            var arr = rects[hitIndex];
            arr.forEach(function(el){
              moveRect(el);
            });
          }
          canvas.renderAll();
        },
        onComplete: function(){
          console.log('complete');
          // open modal
        }
      });
    }
  });



  setImage({
    name: 'ship'
    , path: 'assets/images/ship-white.png'
    , scale: imgScale
    , posX: w / 2
    , posY: h
    , orientX: 'center'
    , orientY: 'bottom'
  });
  setImage({
    name: 'monster-red'
    , path: 'assets/images/monster-red.png'
    , scale: imgScale
    , posX: w * 1/4
    , posY: h * 1/2
    , orientX: 'center'
    , orientY: 'bottom'
    , delay: 1
    , text: 'story'
    , pushToShipLimits: true
    , idx: 0
  });
  setImage({
    name: 'monster-green'
    , path: 'assets/images/monster-green.png'
    , scale: imgScale
    , delay: 0
    , text: 'projects'
    , posX: w * 2/4
    , posY: h * 1/2
    , orientX: 'center'
    , orientY: 'bottom'
    , pushToShipLimits: true
    , idx: 1
  });
  setImage({
    name: 'monster-yellow'
    , path: 'assets/images/monster-yellow.png'
    , scale: imgScale
    , delay: 2
    , text: 'contact'
    , posX: w * 3/4
    , posY: h * 1/2
    , orientX: 'center'
    , orientY: 'bottom'
    , pushToShipLimits: true
    , idx: 2
  });
}

sizeWindow();
renderImages();

window.onresize = function(){
  sizeWindow();
  renderImages();
}


function setImage(obj){
  fabric.Image.fromURL(obj.path, function(i){
    i.scale(obj.scale)
      .setPositionByOrigin(new fabric.Point(obj.posX, obj.posY), obj.orientX, obj.orientY);
    i.set('selectable', false);
    if (null != obj.delay)
      bobbleImage(i, 'top', '+=15', obj.delay);
    canvas.add(i);
    if (obj.name === 'ship') shipObj = i;
    if (obj.pushToShipLimits){
      imageObjs.push(i);
      targetXLimits.push(
        {left: i.aCoords.bl.x, right: i.aCoords.br.x, center: obj.posX, bottom: obj.posY}
      );
      for (let z = 0; z < numberOfParticles; z++){
        var p = new Promise(function(resolve, reject){
          var val = (i.aCoords.tl.y + obj.posY) / 2;
          var rc = randomColors[Math.floor(Math.random() * randomColors.length)];
          resolve({val: val, rc: rc});
        }).then(function(o){
          createRect(obj.posX, o.val, o.rc, particleSize, particleSize, obj.idx);
        })
      }
    }
    if (obj.text){
      createCaption(obj);
    }
    return i;
  });
}

function createCaption(obj){
  var caption = new fabric.Text(obj.text,
  { stroke: 'white'
    , fill: 'white'
    , fontFamily: 'Emulogic'
    , fontSize: subtitleSize
  });
  caption.setPositionByOrigin(
    new fabric.Point(obj.posX, obj.posY)
  );
  canvas.add(caption);
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
