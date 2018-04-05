var randomNumber = (num) => {
  return Math.floor(Math.random() * num);
}

var randomFloat = (num) => {
  return Math.random() * num;
}

function addNumbers(num1, num2){
  return num1 + num2;
}

function subtractNumbers(num1, num2){
  return num1 - num2;
}

function showModal(option){
  var headerStr = document.querySelector('#header-template').innerHTML;
  if (option === 'story'){
    document.querySelector('#modal').innerHTML = headerStr + document.querySelector('#story-template').innerHTML;
  }
  else if (option === 'projects'){
    var projectHeaderStr = '<div class="project-header">' + replaceProjectHeader() + '</div>';
    var projectStr = replaceTemplate();
    document.querySelector('#modal').innerHTML = headerStr + projectHeaderStr + projectStr;
  }
  else if (option === 'contact'){
    document.querySelector('#modal').innerHTML = headerStr + document.querySelector('#contact-template').innerHTML;
  }
  document.querySelector('#modal').style = "height:80vh";
  document.querySelector('#close-modal').classList.remove('hidden');
}

function replaceProjectHeader(){
  return projectData.map(project => {
    var templateStr = document.querySelector('#project-header-template').content.querySelector('a').outerHTML + document.querySelector('#project-header-template').content.querySelector('a[href="LINK_HREF"]').outerHTML;
    templateStr = templateStr.replace('LINK_HREF', project['LINK_HREF']);
    templateStr = templateStr.replace('PROJECT_TITLE', project['PROJECT_TITLE']);
    return templateStr;
  }).join(' | ');
}

function replaceTemplate(){
  return projectData.map(kv => {
    var projectStr = document.querySelector('#project-template').innerHTML;
    for (var key in kv){
      if ( !Array.isArray(kv[key]) ){
        projectStr = projectStr.replace(key, kv[key]);
      } else {
        if (kv[key].length > 0){
          var parentUl = document.querySelector('#project-template').content.querySelector(arrayPoints[key]['child']);
          var childLi = parentUl.firstElementChild.cloneNode(true);
          var copyParent = parentUl.cloneNode(true);
          copyParent.innerHTML = '';
          kv[key].forEach(function(text){
            childLi.textContent = text;
            copyParent.innerHTML += childLi.outerHTML;
          });
          projectStr = projectStr.replace(parentUl.outerHTML, copyParent.outerHTML);
        } else {
          var replaceStr = document.querySelector('#project-template').content.querySelector(arrayPoints[key]['parent']).outerHTML;
          projectStr = projectStr.replace(replaceStr, '');
        }
      }
    }
    return projectStr;
  }).join('');
}

var renderSelf = function(canvas, cb, cb2, cb3){
  fabric.Image.fromURL(this.imagePath, function(i){
    i.scale(this.scale.img)
      .setPositionByOrigin(
        new fabric.Point(this.orientation.x, this.orientation.y), this.orientation.orientX, this.orientation.orientY
      );
    i.set('selectable', false);
    this.fabricImage = i;
    canvas.add(i);
    canvas.sendToBack(i);
    if (cb) cb(i, canvas, this);
    if (cb2) cb2(i, canvas, this);
  }.bind(this));
}

var determineCoordinates = function(w, h){
  this.orientation.x = w * this.orientation.xDivision;
  this.orientation.y = h * this.orientation.yDivision;
  this.orientation.bottom = h * this.orientation.yDivision;
}

var recordBorderCoordinates = function(i, canvas, monster){
  monster.orientation.left = i.aCoords.bl.x;
  monster.orientation.right = i.aCoords.br.x;
  monster.orientation.center = (i.aCoords.tl.y + monster.orientation.y) / 2;
  monster.orientation.top = i.top;
  if (monster.createParticles) monster.createParticles();
};

var bobble = function(i, canvas, monster){
  window.setTimeout(function(){
    i.animate(monster.bobbleConfig.bobbleDirection,monster.bobbleConfig.bobbleMagnitude, {
        duration: 800,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function(){
          monster.bobbleConfig.bobbleMagnitude = monster.bobbleConfig.bobbleMagnitude.includes('+') ? monster.bobbleConfig.bobbleMagnitude.replace('+', '-') : monster.bobbleConfig.bobbleMagnitude.replace('-', '+');
          bobble(i, canvas, monster);
        }
    })
  }, monster.bobbleConfig.bobbleDelay * 300
  );
}

let mixin = {
  renderSelf: renderSelf,
  determineCoordinates: determineCoordinates,
  recordBorderCoordinates: recordBorderCoordinates
};
