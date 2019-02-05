// Libs
import "../lib/sketch.min";
import interpolate from 'color-interpolate';
import { TweenLite, Circ } from 'gsap';

// Elements
import Tentacle from "./Tentacle";

// Tentacles settings
let settings = {
  interactive: false,
  thickness: 30,
  tentacles: 90,
  friction: 0.02,
  gravity: 0.15,
  tentaclesFill: '#000000',
  tentaclesStroke: '#4c4c4c',
  tentaclesStrokeOpacity: 1,
  length: 30,
  pulse: true,
  wind: 0,
  movement: {
    'min': -20,
    'max': 20,
  },
  tentacleFillColor: {
    venom: 'rgb(0,0,0)',
    carnage: 'rgb(193, 26, 27)',
  },
  tentacleStrokeColor: {
    venom: 'rgb(76,76,76)',
    carnage: 'rgb(51, 3, 0)',
  },
  colorRatio: 0,
};

// Setup parametters
let tentacles = [];
let position = { x:0, y:0 };
let backgroundColor = 'rgb(240,240,240, 0.9)';
let opacity = 0;
let canvasHeight;
let fillColormap = interpolate([settings.tentacleFillColor.venom, settings.tentacleFillColor.carnage]);
let strokeColormap = interpolate([settings.tentacleStrokeColor.venom, settings.tentacleStrokeColor.carnage]);
let maxScore;
let score = 0;
let image = {
  status: false,
};
let sketch;

settings.tentaclesFill = fillColormap(0);


export default function Canvas($element, questions) {
  maxScore = questions.length * 2;

  // opacity on canvas launching
  const changeOpacity = function() {
    const timeout = setInterval(() => {
      if (opacity < 1) {
        opacity += 0.1;
      } else {
        opacity =1;
        clearTimeout(timeout);
      }
    }, 100);
  };
  changeOpacity();

  // Canvas
  sketch = Sketch.create({

    retina: false,

    container: document.getElementById( $element ),

    preload: function() {},

    setup: function() {
      canvasHeight = this.height;
      this.tentaculesMiddle = settings.tentacles / 2;
      this.tentaculesSpacing = 14;

      position.x = this.width;
      position.y = this.height;


      // create Tentacles
      for (let i = 0; i < settings.tentacles; i++ ) {
        let side;
        if (this.tentaculesMiddle > i ) {
          side = 'left';
        } else {
          side = 'right';
        }
        createTentacle(side, 20, 21);
      }
    },

    update: function() {
      if ( settings.pulse ) {
        position.y = random(settings.movement.min, settings.movement.max );
      }
      for ( let i = 0;  i < tentacles.length ; i++ ) {
        tentacles[i].move(position.y);
        tentacles[i].update();
      }
    },

    draw: function() {
      this.globalAlpha = opacity;
      this.fillStyle = backgroundColor;
      this.fillRect(0, 0, this.width, this.height);

      // draw tentacules
      for ( let i = 0, n = tentacles.length; i < n; i++ ) {
        tentacles[i].draw( this, settings.tentaclesStrokeOpacity );
      }
      drawImage(this);
    },

    resize: function() {
      position.x = this.width;
      position.y = this.height;
      canvasHeight = this.height;
      for (let i = 0; i < tentacles.length; i++ ) {
        tentacles[i].move(position.y, position.x, true);
      }
    }
  });
};

Canvas.prototype.update = function(progress, newScore, movement = true) {
  const newTentacles = 30;
  settings.gravity += 0.000;
  score = newScore;


  // Change movement
  if (movement) {
    settings.movement.min -= 7;
    settings.movement.max += 7;

    // Change color
    changeColor();
  } else {
    settings.gravity += 0.5;
    settings.movement.min = -10;
    settings.movement.max = 10;

    // Change color
    changeColor(true);
  }

  // New tentacles
  for (let i= 0; i <= newTentacles; i++) {
    if (i > newTentacles/2) {
      createTentacle('left', 20 + (progress * 25), 21 + (progress * 25));
      if (i%10) {
        tentacles.splice(0, 1);
      }
    } else {
      createTentacle('right', 20 + (progress * 25), 21 + (progress * 25));
      if (i%10) {
        tentacles.splice(tentacles.length / 2 + 1, 1);
      }
    }
  }
};

Canvas.prototype.animEnd = function () {
  let color, image;
  if (score > 0) {
    color = settings.tentacleFillColor.venom;
    image = 'Venom';
  } else {
    color = settings.tentacleFillColor.carnage;
    image = 'Carnage';
  }
  getImage(image);
  let backgroundColormap = interpolate([ backgroundColor, color]);
  let i = 0;
  setTimeout(() => {
    let interval = setInterval(() => {
      backgroundColor = backgroundColormap(i);
      i += 0.1;
      if (i >= 1 ) {
        clearInterval(interval);
        let interval2 = setInterval(() => {
          settings.tentaclesStrokeOpacity -= 0.1;
          settings.tentaclesStrokeOpacity = Math.round(settings.tentaclesStrokeOpacity*100)/100;
          if (settings.tentaclesStrokeOpacity <= 0 ) {
            clearInterval(interval2);
            tentacles = [];
          }
        }, 100);
      }
    }, 100);
  }, 1000);
};

const createTentacle = function(side, minHeight, maxHeight) {
  const length = {
    min: minHeight || 10,
    max: maxHeight || 11
  };
  let tentacle;
  tentacle = new Tentacle(
    settings,
    {
      side: side,
      length: random( length.min, length.max ),
      radius: random( 0.05, 1.0 ),
      spacing: random( 0.2, 1.0 ),
      friction: random( 0.77, 0.88 ),
      canvasHeight: canvasHeight,
    });

  tentacle.move(position.y, position.x, true );
  tentacles.push( tentacle );
};

const changeColor = function(end = false) {
  let result;
  if (score > 0) {
    result = 0;
  } else {
    result = (-score / maxScore);
    if (end === true) {
      result = 1;
    }
  }
  let tentaculesRatio = {val: settings.colorRatio};

  const progressColor = TweenLite.to(tentaculesRatio, 1, { val: result});
  progressColor.eventCallback('onUpdate', function () {
    settings.colorRatio = tentaculesRatio.val;
    settings.tentaclesFill = fillColormap(settings.colorRatio);
    settings.tentaclesStroke = strokeColormap(settings.colorRatio);
  });
};

const getImage = function(name) {
  image.image = new Image();
  image.image.onload = function() {
    image.status = true;
  };
  image.image.src = `public/images/result/${name}.svg`;

};

const drawImage = function (ctx) {
  if (image.status) {
    // ctx.drawImage(image.image, 0, 0);
  }
};

