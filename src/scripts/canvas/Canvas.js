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
  length: 30,
  pulse: true,
  wind: 0,
  movement: {
    'min': -20,
    'max': 20,
  },
  tentacleStrokeColor: {
    'venom': "rgb(76,76,76)",
    'carnage': 'rgb(215, 0, 0)',
  },
  tentacleFillColor: {
    'venom': "rgb(0,0,0)",
    'carnage': 'rgb(255, 0, 0)',
  },
  colorRatio: 0,
};

// Setup parametters
let tentacles = [];
let position = { x:0, y:0 };
let backgroundColor = 'rgb(240,240,240)';
let opacity = 0;
let canvasHeight;
let colormap = interpolate([settings.tentacleFillColor.venom, settings.tentacleFillColor.carnage]);

settings.tentaclesFill= colormap(0);


export default function Canvas($element) {

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
  let sketch = Sketch.create({

    retina: false,

    container: document.getElementById( $element ),

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
        tentacles[i].draw( this );
      }
      // this.fillRect(0, 0, this.width * progress , this.height);
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

Canvas.prototype.update = function(progress, score, movement = true) {
  const newTentacles = 30;
  settings.gravity += 0.000;


  // Change color
  let ratio = {val: settings.colorRatio};
  let result;
  if (score > 0) {
    result = 0;
  } else {
    result = (-score / 20);
  }
  // ease color
  const progressColor = TweenLite.to(ratio, 1, { val: result});
  progressColor.eventCallback('onUpdate', function () {
    settings.colorRatio = ratio.val;
    settings.tentaclesFill = colormap(settings.colorRatio);
  });



  // Change movement
  if (movement) {
    settings.movement.min -= 7;
    settings.movement.max += 7;
  } else {
    settings.gravity += 0.5;
    settings.movement.min = -10;
    settings.movement.max = 10;
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
