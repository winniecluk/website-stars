var w = document.documentElement.clientWidth - 10;
var h = document.documentElement.clientHeight - 10;

window.onresize = function(){
  w = document.documentElement.clientWidth - 10;
  h = document.documentElement.clientHeight - 10;
}

canvas = new fabric.Canvas('star-system', {
    width: w,
    height: h
});

var monsterLeft = new Enemy(
  'monster-left'
  , 'assets/images/monster-red.png'
  , false
  , { x: 'center', y: 'bottom', xDivision: 1/4, yDivision: 1/2 }
  , { stroke: 'white', fill: 'white', fontFamily: 'Emulogic', content: 'Story'}
  , { bobbleDirection: 'top', bobbleMagnitude: '+=15', bobbleDelay: 1}
);

var monsterCenter = new Enemy(
  'monster-center'
  , 'assets/images/monster-green.png'
  , true
  , { x: 'center', y: 'bottom', xDivision: 2/4, yDivision: 1/2 }
  , { stroke: 'white', fill: 'white', fontFamily: 'Emulogic', content: 'Projects'}
  , { bobbleDirection: 'top', bobbleMagnitude: '+=15', bobbleDelay: 2}
);

var monsterRight = new Enemy(
  'monster-center'
  , 'assets/images/monster-yellow.png'
  , false
  , { x: 'center', y: 'bottom', xDivision: 3/4, yDivision: 1/2 }
  , { stroke: 'white', fill: 'white', fontFamily: 'Emulogic', content: 'Contact'}
  , { bobbleDirection: 'top', bobbleMagnitude: '+=15', bobbleDelay: 0}
);

var userShip = new Ship(
  'ship'
  , 'assets/images/ship-white.png'
  , false
  , { x: 'center', y: 'bottom', xDivision: 1/2, yDivision: 1}
  , { stroke: 'rgb(0,255,58)', strokeWidth: 5, selectable: false}
);

var monstersArr = [monsterLeft, monsterCenter, monsterRight];

function renderMonsters(monstersArr){
  monstersArr.forEach(function(monster){
    monster.determineSize(w);
    monster.determineCoordinates(w, h);
    monster.renderSelf(canvas, bobble, recordBorderCoordinates);
    monster.renderTitle(canvas);
  })
}

renderMonsters(monstersArr);
userShip.determineSize(w);
userShip.determineCoordinates(w, h);
userShip.renderSelf(canvas, recordBorderCoordinates);

canvas.on('mouse:move', function(e){
  if (userShip){
    userShip.move(e.e.clientX);
  }
});

canvas.on('mouse:down', function(e){
  if (userShip){
    userShip.fire(canvas, e.e.clientX, monstersArr);
  }
})

