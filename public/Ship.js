class Ship extends Image {

  constructor(label, imagePath, selectable, orientConfig, bulletConfig){
    super(label, imagePath, selectable);
    this.orientation = {
      x: '',
      y: '',
      left: '',
      right: '',
      center: '',
      top: '',
      xDivision: orientConfig.xDivision,
      yDivision: orientConfig.yDivision,
      orientX: orientConfig.x,
      orientY: orientConfig.y,
    };
    this.fabricImage;
    this.bulletConfig = bulletConfig;
  }

  move(x){
    this.fabricImage.setPositionByOrigin(
      new fabric.Point(x, this.orientation.y),
      'center',
      'bottom'
    );
    canvas.renderAll();
  }

  fire(canvas, x, monsters){
    var b = new Bullet(
      {
        stroke: 'rgb(0,255,58)'
        , strokeWidth: 5
        , selectable: false
      }
      , [
          {x: x, y: this.orientation.top}
        , {x: x, y: this.orientation.top - 20}
      ]
      , 1.5
      , x
    );
    var polyline = b.initiate();
    b.move(canvas, polyline, monsters, x);

  }
}

Object.assign(Ship.prototype, mixin);

