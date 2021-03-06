class Bullet {
  constructor(bulletConfig, startPoints, speed, x){
    this.bulletConfig = bulletConfig;
    this.startPoints = startPoints;
    this.speed = speed * 1000;
    this.x = x;
    this.polyline;
    this.madeContact = false;
  }

  initiate(cb){
    var polyline = new fabric.Polyline(
      this.startPoints
      , this.bulletConfig
    );
    canvas.add(polyline);
    this.polyline = polyline;
    if (cb) cb(polyline);
    return polyline;
  }

  move(canvas, polyline, monsters){
    var self = this;
    if (!this.madeContact){
      if (!this.polyline) this.polyline = polyline;
      fabric.util.animate({
        startValue: self.startPoints[0].y
        , endValue: 0
        , duration: self.speed
        , onChange: function(value){
          polyline.setPositionByOrigin(
              new fabric.Point(self.startPoints[0].x, value),
              'center', 'bottom'
            );
          monsters.forEach(monster => {
            if ( (self.x >= monster.orientation.left && self.x <= monster.orientation.right) && value <= monster.orientation.bottom ){
              monster.explode(canvas);
            }
          });
        }
      })
      this.madeContact = true;
    }
  }
}
