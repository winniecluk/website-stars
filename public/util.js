var randomNumber = (num) => {
  return Math.floor(Math.random() * num);
}

function addNumbers(num1, num2){
  return num1 + num2;
}

function subtractNumbers(num1, num2){
  return num1 - num2;
}

var renderSelf = function(canvas, cb, cb2, cb3){
  fabric.Image.fromURL(this.imagePath, function(i){
    i.scale(this.scale.img)
      .setPositionByOrigin(
        new fabric.Point(this.orientation.x, this.orientation.y), this.orientation.orientX, this.orientation.orientY
      );
    this.fabricImage = i;
    canvas.add(i);
    canvas.sendToBack(i);
    if (cb) cb(i, canvas, this);
    if (cb2) cb2(i, canvas, this);
  }.bind(this));
}

var determineCoordinates = function(w, h){
  this.orientation.x = w * this.orientation.xDivision;
  this.orientation.y = h * this.orientation.yDivision;
  this.orientation.bottom = h * this.orientation.yDivision;
}

var recordBorderCoordinates = function(i, canvas, monster){
  monster.orientation.left = i.aCoords.bl.x;
  monster.orientation.right = i.aCoords.br.x;
  monster.orientation.center = (i.aCoords.tl.y + monster.orientation.y) / 2;
  monster.orientation.top = i.top;
};

var bobble = function(i, canvas, monster){
  window.setTimeout(function(){
    i.animate(monster.bobbleConfig.bobbleDirection,monster.bobbleConfig.bobbleMagnitude, {
        duration: 800,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function(){
          monster.bobbleConfig.bobbleMagnitude = monster.bobbleConfig.bobbleMagnitude.includes('+') ? monster.bobbleConfig.bobbleMagnitude.replace('+', '-') : monster.bobbleConfig.bobbleMagnitude.replace('-', '+');
          bobble(i, canvas, monster);
        }
    })
  }, monster.bobbleConfig.bobbleDelay * 300
  );
}

let mixin = {
  renderSelf: renderSelf,
  determineCoordinates: determineCoordinates,
  recordBorderCoordinates: recordBorderCoordinates
};
