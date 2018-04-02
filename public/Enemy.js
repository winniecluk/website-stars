class Enemy extends Image {
  constructor(label, imagePath, selectable, orientConfig, titleConfig, bobbleConfig){

    super(label, imagePath, selectable);
    this.orientation = {
      x: '',
      y: '',
      left: '',
      right: '',
      center: '',
      bottom: '',
      xDivision: orientConfig.xDivision,
      yDivision: orientConfig.yDivision,
      orientX: orientConfig.x,
      orientY: orientConfig.y
    };

    // caption image
    this.caption;

    // title
    this.titleConfig = titleConfig;
    this.particles = [];
    this.bobbleConfig = bobbleConfig;
    this.fabricImage;
  }

  renderTitle(canvas){
    let caption = new fabric.Text(this.titleConfig.content,
      {
        stroke: this.titleConfig.stroke
        , fill: this.titleConfig.fill
        , fontFamily: this.titleConfig.fontFamily
        , fontSize: this.scale.title
      });
    caption
      .setPositionByOrigin(
        new fabric.Point(
          this.orientation.x
          , this.orientation.y
        )
      );
    canvas.add(caption);
    canvas.bringToFront(caption);
    this.caption = caption;
  }

  explode(canvas){
    console.log('exploding');
    canvas.remove(this.fabricImage);
    var numParticles = this.scale.numParticles;
    console.log('this');
    var self = this;
    for (let i = 0; i < numParticles; i++){
      console.log('creating each particle');
      var p = new Particle(
        'particle'
        , ''
        , false
        , particleColors[randomNumber(particleColors.length)]
        , {
          left: self.orientation.x
          , top: self.orientation.center
          , width: self.scale.particleSize
          , height: self.scale.particleSize
          }
        );
        p.determineSpeed();
        p.renderSelf(canvas, true);
        self.particles.push(p);
    }
  }
}

Object.assign(Enemy.prototype, mixin);
