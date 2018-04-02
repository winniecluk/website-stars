const particleColors = [
  '#DEDEDE'
  , '#FF0000'
  , '#F8FF00'
];

const enemyScale = {
  x_small: {
    img: 0.4,
    title: 12,
    numParticles: 4,
    particleSize: 5
  },
  small: {
    img: 0.6,
    title: 20,
    numParticles: 4,
    particleSize: 5
  },
  medium: {
    img: 0.8,
    title: 26,
    numParticles: 4,
    particleSize: 5
  },
  large: {
    img: 0.8,
    title: 26,
    numParticles: 4,
    particleSize: 5
  },
  x_large: {
    img: 1,
    title: 26,
    numParticles: 4,
    particleSize: 5
  }
};

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

