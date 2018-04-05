class Particle extends Image {

  constructor(label, imagePath, selectable, color, orientation, dimensions){
    // orientation has left and top
    super(label, imagePath, selectable);
    this.orientation = orientation;
    this.color = color;
    this.dimensions = dimensions;
    this.speed = {
      x: ''
      , y: ''
    };
    this.moveAbility = directions[randomNumber(directions.length)];
    this.fabricImage;
  }

  changeColor(arr, canvas){
    this.color = arr[randomNumber(arr.length)];
    this.fabricImage.set({
      fill: this.color
    });
  }

  renderSelf(canvas, cb){
    canvas.add(this.fabricImage);
    canvas.sendToBack(this.fabricImage);
  }

  createImage(){
    var rect = new fabric.Rect({
      left: this.orientation.left
      , top: this.orientation.top
      , fill: this.color
      , width: this.dimensions.width
      , height: this.dimensions.height
    });
    this.fabricImage = rect;
  }

  determineSpeed(){
    this.speed.x = randomFloat(1.5);
    this.speed.y = randomFloat(1.5);
  }

  move(canvas){
    this.orientation.left = this.moveAbility.moveLeft? this.moveAbility.moveLeft(this.orientation.left, this.speed.x) : this.orientation.left;
    this.orientation.top = this.moveAbility.moveTop ? this.moveAbility.moveTop(this.orientation.top, this.speed.y) : this.orientation.top;
    this.fabricImage.set({
      left: this.orientation.left,
      top: this.orientation.top
    });
    this.speed.x = this.speed.x * 1.01;
  }

}
