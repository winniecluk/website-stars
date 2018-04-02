class Image {
  constructor(label, imagePath, selectable) {
    this.label = label;
    this.scale;
    this.imagePath = imagePath;
    this.selectable = selectable;
    this.fabricImage;
  }

  determineSize(w) {
    switch(true){
      case w < 600:
        this.scale = enemyScale['x_small'];
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
        this.scale = enemyScale['x_large'];
        break;
    }
  }
}
