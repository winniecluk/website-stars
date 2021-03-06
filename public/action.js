var w = document.documentElement.clientWidth - 10;
var h = document.documentElement.clientHeight - 10;

window.onresize = function(){
  w = document.documentElement.clientWidth - 10;
  h = document.documentElement.clientHeight - 10;
  rerender();
}

function hideModal(){
  document.querySelector('#modal').innerHTML = '';
  document.querySelector('#modal').style = "height:0";
}

function rerender(){
  var starSystem = document.querySelector('#star-system');
  var body = document.querySelector('body');
  if (starSystem){
    starSystem.parentNode.removeChild(starSystem);
    var newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('id', 'star-system');
    body.insertBefore(newCanvas, body.children[0]);
    init();
  }
}

function init(){
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
    , 'story'
  );

  var monsterCenter = new Enemy(
    'monster-center'
    , 'assets/images/monster-green.png'
    , true
    , { x: 'center', y: 'bottom', xDivision: 2/4, yDivision: 1/2 }
    , { stroke: 'white', fill: 'white', fontFamily: 'Emulogic', content: 'Projects'}
    , { bobbleDirection: 'top', bobbleMagnitude: '+=15', bobbleDelay: 2}
    , 'projects'
  );

  var monsterRight = new Enemy(
    'monster-center'
    , 'assets/images/monster-yellow.png'
    , false
    , { x: 'center', y: 'bottom', xDivision: 3/4, yDivision: 1/2 }
    , { stroke: 'white', fill: 'white', fontFamily: 'Emulogic', content: 'Contact'}
    , { bobbleDirection: 'top', bobbleMagnitude: '+=15', bobbleDelay: 0}
    , 'contact'
  );

  var userShip = new Ship(
    'ship'
    , 'assets/images/ship-white.png'
    , false
    , { x: 'center', y: 'bottom', xDivision: 1/2, yDivision: 1}
    , { stroke: 'rgb(0,255,58)', strokeWidth: 5, selectable: false}
  );

  monstersArr = [monsterLeft, monsterCenter, monsterRight];

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
}

document.addEventListener('click', function(e){
  if (e.target.id === 'close-modal'){
    hideModal();
  }
  if (e.target.id === 'submit-info'){
    document.querySelector('#modal').innerHTML = document.querySelector('#confirmation-template').innerHTML;
  }
})


function renderMonsters(monstersArr){
  monstersArr.forEach(function(monster){
    monster.determineSize(w);
    monster.determineCoordinates(w, h);
    monster.renderSelf(canvas, bobble, recordBorderCoordinates);
    monster.renderTitle(canvas);
  })
}

