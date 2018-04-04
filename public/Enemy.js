class Enemy extends Image {
  constructor(label, imagePath, selectable, orientConfig, titleConfig, bobbleConfig, option){

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

    // content correlation
    this.option = option;

    // title
    this.titleConfig = titleConfig;
    this.particles = [];
    this.bobbleConfig = bobbleConfig;
    this.fabricImage;
    this.exploded = false;
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

  createParticles(){
    var numParticles = this.scale.numParticles;
    var self = this;
    for (let i = 0; i < numParticles; i++){
      var p = new Particle(
        'particle'
        , ''
        , false
        , particleColors[randomNumber(particleColors.length)]
        , {
          left: self.orientation.x
          , top: self.orientation.center
        }
        , {
          width: self.scale.particleSize
          , height: self.scale.particleSize
          }
        );
      p.determineSpeed();
      p.createImage();
      self.particles.push(p);
    }
  }

  explode(canvas){
    if (!this.exploded){
      var self = this;
      canvas.remove(this.fabricImage);
      this.particles.forEach(particle => {
        particle.renderSelf(canvas, true);
      });
      var intervalId = window.setInterval(() => {
        this.particles.forEach(particle => {
          particle.move(canvas);
        });
        canvas.renderAll();
      }, 100);
      var timeoutId = window.setTimeout(function(){
        clearTimeout(intervalId);
        clearTimeout(timeoutId);
        showModal(self.option);
      }, 1 * 300);
      this.exploded = true;
    }
  }

}

Object.assign(Enemy.prototype, mixin);
