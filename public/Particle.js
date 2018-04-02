class Particle extends Image {

  constructor(label, imagePath, selectable, color, dimensions){
    // orientation has left and top
    super(label, imagePath, selectable);
    this.orientation = {
      left: ''
      , top: ''
    };
    this.color = color;
    this.dimensions = dimensions;
    this.speed = {
      x: ''
      , y: ''
    };
    this.moveAbility = directions[randomNumber(directions.length)];
    this.fabricImage;
  }

  changeColor(){
    this.color = particleColors[randomNumber(particleColors.length)];
  }

  renderSelf(canvas, cb){
    var rect = new fabric.Rect({
      left: this.dimensions.left
      , top: this.dimensions.top
      , fill: this.color
      , width: this.dimensions.width
      , height: this.dimensions.height
    });
    canvas.add(rect);
    this.fabricImage = rect;
    if (cb) this.move(rect, canvas);
  }

  determineSpeed(){
    this.speed.x = randomNumber(5);
    this.speed.y = randomNumber(5);
  }

  move(rect, canvas){
    this.left = this.moveAbility.moveLeft? this.moveAbility.moveLeft(this.orientation.left, this.speed.x) : this.left;
    this.top = this.moveAbility.moveTop ? this.moveAbility.moveTop(this.orientation.top, this.speed.y) : this.top;
    rect.set({
      left: this.left,
      top: this.top
    });
    canvas.renderAll();
  }

}
