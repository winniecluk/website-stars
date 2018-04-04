const particleColors = [
  '#DEDEDE'
  , '#FF0000'
  , '#F8FF00'
];

const enemyScale = {
  x_small: {
    img: 0.4,
    title: 12,
    numParticles: 8,
    particleSize: 5
  },
  small: {
    img: 0.6,
    title: 20,
    numParticles: 8,
    particleSize: 8
  },
  medium: {
    img: 0.8,
    title: 26,
    numParticles: 8,
    particleSize: 8
  },
  large: {
    img: 0.8,
    title: 26,
    numParticles: 8,
    particleSize: 5
  },
  x_large: {
    img: 1,
    title: 26,
    numParticles: 8,
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

const projectData = [
  {
    PROJECT_TITLE: 'ZO Map'
    , PROJECT_START_DATE: '10/31/16'
    , PROJECT_END_DATE: '11/04/16'
    , PROJECT_DESCRIPTION: 'An interactive map for a magazine aiming to host a global live arts performance event'
    , IMAGE_HREF: './assets/images/screenshot-map.png'
    , PROJECT_HREF: 'http://github.com/winniecluk/zo-map'
    , APP_HREF: 'http://zomap.herokuapp.com'
    , TEAM_MEMBERS: []
    , FEATURE_POINTS: [
        'Users can click on a country on the map to see all artists in that country registered to perform for ZO Magazine.'
        , 'Interested artists can submit their information for approval to work with the magazine.'
        , 'As an admin, approve or reject interested artists. Approved artists will now be displayed on the map; rejected artists can be cleared from the database if so desired.'
      ]
    , TECH_POINTS: [
      'MEAN stack'
      , 'JSON web tokens'
      , 'Gulp'
      , 'RaphaelJS'
      , 'Responsive'
    ]
  }
  , {
    PROJECT_TITLE: 'LArk'
    , PROJECT_START_DATE: '10/10/16'
    , PROJECT_END_DATE: '10/14/16'
    , PROJECT_DESCRIPTION: 'A mobile-friendly web app to enable drivers around Los Angeles to share parking tips'
    , IMAGE_HREF: './assets/images/screenshot-lark.png'
    , PROJECT_HREF: 'https://github.com/winniecluk/LArk'
    , APP_HREF: 'http://lark-it.herokuapp.com'
    , TEAM_MEMBERS: ['Sochin Ancheta', 'Joseph Kim', 'Winnie Luk', 'James Tak']
    , FEATURE_POINTS: [
        'Users can click on any spot on the map to add a parking tip. They can also edit their own tips.'
        , 'Users can view parking tips submitted by other users.'
        , 'Users can flag other tips as incorrect. Once the number of flags on a tip reaches a certain threshold, the tip is automatically hidden on the map.'
      ]
    , TECH_POINTS: [
      'MongoDB + Mongoose'
      , 'Express + Node.js'
      , 'Handlebars'
      , 'Bootstrap'
      , 'oAuth 2.0'
      , 'Socket IO'
      , 'jQuery to make AJAX calls to own API'
      , 'Consuming Google Maps JavaScript API'
      , 'Team collaboration'
    ]
  }
  , {
    PROJECT_TITLE: 'Folio'
    , PROJECT_START_DATE: '09/19/16'
    , PROJECT_END_DATE: '09/23/16'
    , PROJECT_DESCRIPTION: 'Project management and bidding system for translation industry'
    , PROJECT_HREF: 'http://github.com/winniecluk/translate_app_v1'
    , IMAGE_HREF: './assets/images/screenshot-folio.png'
    , APP_HREF: 'http://translate-app-v1.herokuapp.com'
    , TEAM_MEMBERS: ['Winnie Luk']
    , FEATURE_POINTS: [
        'As a client, create new translation projects, approve available vendors for your project, and receive the translation from the vendor.'
        , 'As a vendor, view available translation projects, bid on them, and upload your work directly to the client.'
        , 'Completed translations along with original source documents remain available in the "Completed Projects" portion of the user\'s dashboard.'
      ]
    , TECH_POINTS: [
      'Ruby on Rails'
      , 'PostgreSQL'
      , 'Bootstrap'
      , 'Amazon Web Services'
      , 'Gems: paperclip, bcrypt'
    ]
  }
  , {
    PROJECT_TITLE: 'Save Our Spiders'
    , PROJECT_START_DATE: '08/29/16'
    , PROJECT_END_DATE: '09/02/16'
    , PROJECT_DESCRIPTION: 'A JavaScript game similar to Whack-A-Mole that trains the user to distinguish between a poisonous spider and a non-poisonous spider'
    , PROJECT_HREF: 'http://github.com/winniecluk/project1'
    , IMAGE_HREF: './assets/images/game-screen.png'
    , APP_HREF: 'http://winniecluk.github.io/project1'
    , TEAM_MEMBERS: ['Winnie Luk']
    , FEATURE_POINTS: []
    , TECH_POINTS: [
      'HTML'
      , 'CSS3 keyframes'
      , 'JavaScript'
      , 'jQuery for DOM manipulation'
    ]
  }
  , {
  PROJECT_TITLE: 'Tic Tac Titans'
  , PROJECT_START_DATE: '08/20/16'
  , PROJECT_END_DATE: '08/21/16'
  , PROJECT_DESCRIPTION: 'My first ever exercise in JavaScript. I\'m including it here to show my progress in a few months\' time, from hard-coding every step in this exercise to now writing more generalized, reusable code.'
  , PROJECT_HREF: 'http://github.com/winniecluk/tic-tac-titan'
  , IMAGE_HREF: './assets/images/screenshot-tic-tac-titan.png'
  , APP_HREF: 'http://winniecluk.github.io/tic-tac-titan'
  , TEAM_MEMBERS: ['Winnie Luk']
  , FEATURE_POINTS: []
  , TECH_POINTS: [
    'HTML'
    , 'CSS'
    , 'JavaScript'
    ]
  }
];

const arrayPoints = {
  TEAM_MEMBERS: {
    parent: '.team-members'
    , child: '.team-member'
    , content: '#TEAM_MEMBER'
  }
  , FEATURE_POINTS: {
    parent: '.feature-points'
    , child: '.feature-point'
    , content: '#FEATURE_POINT'
  }
  , TECH_POINTS: {
    parent: '.technologies'
    , child: '.technology'
    , content: '#TECHNOLOGY'
  }
}
