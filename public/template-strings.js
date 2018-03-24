var projectStr = '\
      <div>\
        <div class="header grey lighten-4">\
          PROJECT_TITLE (PROJECT_START_DATE - PROJECT_END_DATE)\
        </div>\
        <div class="body">\
          <div class="row">\
            <div class="col s-min m3">\
              <img src="IMAGE_HREF" class="s-min m3">\
              <br />\
              <div style="padding-top:28px;">\
              <strong>PROJECT_DESCRIPTION</strong>\
              </div>\
              <div class="links">\
                <a href="PROJECT_HREF"><strong>See the code</strong></a> |\
                <a href="APP_HREF"><strong>Deployed app</strong></a>\
              </div>\
              #START_TEAM_MEMBERS\
              <div class="team-members">\
                  <h6>Team:</h6>\
                  <ul class="team-member">\
                    #START_TEAM_MEMBER\
                    <li>#TEAM_MEMBER</li>\
                    #END_TEAM_MEMBER\
                  </ul>\
              </div>\
              #END_TEAM_MEMBERS\
            </div>\
\
            <!-- second column -->\
            <div class="col s-max m4">\
              #START_FEATURE_POINTS\
              <div class="feature-points">\
                <h6>Features:</h6>\
                <ul class="feature-point">\
                  #START_FEATURE_POINT\
                  <li>#FEATURE_POINT</li>\
                  #END_FEATURE_POINT\
                </ul>\
              </div>\
              #END_FEATURE_POINTS\
              #START_TECHNOLOGIES\
              <div class="technologies">\
                <h6>Technologies:</h6>\
                <ul class="technology">\
                #START_TECHNOLOGY\
                  <li>#TECHNOLOGY</li>\
                #END_TECHNOLOGY\
                </ul>\
              </div>\
              #END_TECHNOLOGIES\
            </div> <!-- closes column -->\
          </div> <!-- closes row -->\
        </div> <!-- This closes the collapsible-body -->\
      </div>\
      ';


var templateData = {
  TEAM_MEMBERS: {
    eraseClass: ['#START_TEAM_MEMBERS', '#END_TEAM_MEMBERS']
    , contentClass: ['#START_TEAM_MEMBER', '#END_TEAM_MEMBER']
    , liContent: '#TEAM_MEMBER'
  }
  , FEATURE_POINTS: {
    eraseClass: ['#START_FEATURE_POINTS', '#END_FEATURE_POINTS']
    , contentClass: ['#START_FEATURE_POINT', '#END_FEATURE_POINT']
    , liContent: '#FEATURE_POINT'
  }
  , TECH_POINTS: {
    eraseClass: ['#START_TECHNOLOGIES', '#END_TECHNOLOGIES']
    , contentClass: ['#START_TECHNOLOGY', '#END_TECHNOLOGY']
    , liContent: '#TECHNOLOGY'
  }
}

function renderTemplateContent(arr, str){
  var arrKeys = Object.keys(templateData);
  return arr.map(el => {
    var newStr = str;
    for (var key in el){
      if ( arrKeys.includes(key) ){

        if (el[key].length === 0){
          var pointsArr = templateData[key]['eraseClass'];
          newStr = newStr.substring(0, newStr.indexOf(pointsArr[0]) ) + newStr.substring( newStr.indexOf(pointsArr[1]) + pointsArr[1].length);
        } else {
          var contentsArr = templateData[key]['contentClass'];
          var eraseArr = templateData[key]['eraseClass'];
          newStr = newStr.replace(eraseArr[0], '').replace(eraseArr[1], '');
          console.log(newStr);
          console.log(contentsArr);
          var replaceStr = templateData[key]['liContent'];
          var liString = newStr.substring(newStr.indexOf(contentsArr[0]) + contentsArr[0].length, newStr.indexOf(contentsArr[1]) );
          var liStrings = el[key].map(pt => {
            return liString.replace(replaceStr, pt);
          });
          console.log(liStrings);
          newStr = newStr.substring(0, newStr.indexOf(contentsArr[0]) ) + liStrings.join('') + newStr.substring( newStr.indexOf(contentsArr[1]) + contentsArr[1].length );
          // console.log(newStr);
        }
      // if arr obj doesn't include key
      } else {
        newStr = newStr.replace(key, el[key]);
      }
    }
    return newStr;
  })
}
