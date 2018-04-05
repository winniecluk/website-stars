var w = document.documentElement.clientWidth - 10;
var h = document.documentElement.clientHeight - 10;

window.onresize = function(){
  w = document.documentElement.clientWidth - 10;
  h = document.documentElement.clientHeight - 10;
}

const particleColors = [
  '#DEDEDE'
  , '#FF0000'
  , '#F8FF00'
];

const enemyScale = {
  x_small: {
    img: 0.4,
    title: 12,
    particle: 5
  },
  small: {
    img: 0.6,
    title: 20,
    particle: 8
  },
  medium: {
    img: 0.8,
    title: 26,
    particle: 10
  },
  large: {
    img: 0.8,
    title: 26,
    particle: 10
  },
  x_large: {
    img: 1,
    title: 26,
    particle: 10
  }
};

var randomNumber = (num) => {
  return Math.floor(Math.random() * num);
}

function addNumbers(num1, num2){
  return num1 + num2;
}

function subtractNumbers(num1, num2){
  return num1 - num2;
}

var directions = [
  {moveLeft: subtractNumbers, moveTop: null}
  , {moveLeft: subtractNumbers, moveTop: subtractNumbers}
  , {moveLeft: null, moveTop: subtractNumbers}

  , {moveLeft: addNumbers, moveTop: subtractNumbers}
  , {moveLeft: addNumbers, moveTop: null}
  , {moveLeft: addNumbers, moveTop: addNumbers}

  , {moveLeft: null, moveTop: addNumbers}
  , {moveLeft: subtractNumbers, moveTop: addNumbers}
];

class Image {
  constructor(label, imagePath, orientation, selectable) {
    this.label = label;
    this.scale;
    this.imagePath = imagePath;
    this.orientation = orientation;
    this.selectable = selectable;

    //
    this.fabricImage;
  }

  determineSize(w) {
    switch(w){
      case w < 600:
        this.scale = enemyScale['x-small'];
        break;
      case w >= 600 && w < 900:
        this.scale = enemyScale['small'];
        break;
      case w >= 900 && w < 1200:
        this.scale = enemyScale['medium'];
        break;
      case w >= 1200 && w < 1800:
        this.scale = enemyScale['large'];
        break;
      case w >= 1800:
        this.scale = enemyScale['x-large'];
        break;
    }
  }
}

function Particle(color){
  this.color = color;
  this.orientation = {
    this.left = ''
    , this.top = ''
  };
  this.dimensions = {
    this.width = ''
    , this.height = ''
  };
  this.speed = {
    this.x = ''
    , this.y = ''
  };
  this.moveAbility = directions[randomNumber(directions.length)];
}

Particle.prototype.changeColor = function(){
  this.color = particleColors[randomNumber(particleColors.length)];
}

Particle.prototype.determineSpeed = function(){
  this.speed.x = randomNumber(5);
  this.speed.y = randomNumber(5);
}

Particle.prototype.determineSize = Enemy.prototype.determineSize.bind(this);

Particle.prototype.move = function(){
  this.left = this.moveAbility.moveLeft? this.moveAbility.moveLeft(this.left, this.speed.x) : this.left;
  this.top = this.moveAbility.moveTop ? this.moveAbility.moveTop(this.top, this.speed.y) : this.top;
}

function Enemy(label, imagePath, orientConfig, selectable, titleConfig, bobbleDirection, bobbleMagnitude, bobbleDelay){
  this.label = label;
  this.scale;
  this.imagePath = imagePath;
  this.orientation = {
    x: '',
    y: '',
    left: '',
    right: '',
    center: '',
    orientX: orientConfig.x,
    orientY: orientConfig.y
  };
  // fabric image
  this.fabricImage;

  this.selectable = selectable;
  // can extend above

  // caption image
  this.caption;

  // title
  this.titleConfig = titleConfig;
  this.particles = [];

  this.bobbleDirection = bobbleDirection;
  this.bobbleMagnitude = bobbleMagnitude;
  this.bobbleDelay = bobbleDelay;
}

function Ship(orientConfig){
  this.orientation = {
    x: '',
    y: '',
    left: '',
    right: '',
    center: '',
    orientX: orientConfig.x,
    orientY: orientConfig.y
  };
  // fabric image
  this.fabricImage;

}

Enemy.prototype.explode = function(){
  // create particles

  // move particles
}

Ship.prototype.renderSelf = Enemy.prototype.renderSelf.bind(this);
Ship.prototype.recordBorderCoordinates = Enemy.prototype.recordBorderCoordinates.bind(this);
Ship.prototype.determineCoordinates = Enemy.prototype.determineCoordinates.bind(this);

Enemy.prototype.renderSelf = function(){
  fabric.Image.fromURL(this.path, function(i){
    i.scale(this.scale.img)
      .setPositionByOrigin(
        new fabric.Point(this.orientation.x, this.orientation.y), this.orientation.orientX, this.orientation.orientY
      )
  });
}

Enemy.prototype.recordBorderCoordinates = function(i){
  if (!this.fabricImage) this.fabricImage = i;
  this.orientation.left = this.fabricImage.aCoords.bl.x;
  this.orientation.right = this.fabricImage.aCoords.br.x;
  this.orientation.center = (this.fabricImage.aCoords.tl.y + this.orientation.y) / 2;
}

Enemy.prototype.renderTitle = function(canvas){
  let caption = new fabric
    .Text(this.titleConfig.titleContent,
          {
            stroke: this.titleConfig.stroke,
            , fill: this.titleConfig.fill,
            , fontFamily: this.titleConfig.fontFamily,
            , fontSize: this.scale.title
          });
  caption
    .setPositionByOrigin(
      new fabric.Point(
        this.orientation.x
        , this.orientation.y
      )
    );
  // canvas.add(caption);
}

Enemy.prototype.determineCoordinates = function(w, h, xLine, yLine){
  this.orientation.x = w * xLine;
  this.orientation.y = h * yLine;
}

Enemy.prototype.determineSize = function(w){
    switch(w){
      case w < 600:
        this.scale = enemyScale['x-small'];
        break;
      case w >= 600 && w < 900:
        this.scale = enemyScale['small'];
        break;
      case w >= 900 && w < 1200:
        this.scale = enemyScale['medium'];
        break;
      case w >= 1200 && w < 1800:
        this.scale = enemyScale['large'];
        break;
      case w >= 1800:
        this.scale = enemyScale['x-large'];
        break;
    }
}

Enemy.prototype.bobble = function( canvas){
  window.setTimeout(function(){
    this.fabricImage.animate(this.bobbleDirection,this.bobbleMagnitude, {
        duration: 800,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function(){
          var change = this.bobbleMagnitude.includes('+') ? this.bobbleMagnitude.replace('+', '-') : this.bobbleMagnitude.replace('-', '+');
          this.bobble(this.fabricImage, this.bobbleDirection, change)
        }
    })
  }, 300 * this.bobbleDelay);
}

