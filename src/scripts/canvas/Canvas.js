
// Libs
import "../lib/sketch.min";
import interpolate from 'color-interpolate';

// Elements
import Tentacle from "./Tentacle";

// Tentacles settings
let settings = {
  interactive: false,
  thickness: 30,
  tentacles: 90,
  friction: 0.02,
  gravity: 0.1,
  tentaclesFill: '#000000',
  tentaclesStroke: '#4c4c4c',
  length: 30,
  pulse: true,
  wind: 0,
};

// Setup parametters
let colorVenom = "rgb(0,0,0)";
let colorCarnage = "rgb(255, 0, 0)";
let tentacles = [];
let position = { x:0, y:0 };
let backgroundColor = '#F0F0F0F0';
let opacity = 0;
let progress = 0;
let score = 0;
let canvasHeight;
let colormap = interpolate([colorVenom, colorCarnage]);

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
        position.y = random( -20, 20 );
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

Canvas.prototype.update = function(progress, score) {
  const newTentacles = 30;
  settings.gravity += 0.06;

  // Change color
  settings.tentaclesFill = colormap(0);

  // New tentacles
  for (let i= 0; i <= newTentacles; i++) {
    if (i > newTentacles/2) {
      createTentacle('left', 20 + (progress * 25), 21 + (progress * 25));
      if (i%6) {
        tentacles.splice(0, 1);
      }
    } else {
      createTentacle('right', 20 + (progress * 25), 21 + (progress * 25));
      if (i%6) {
        tentacles.splice(tentacles.length / 2 + 1, 1);
      }
    }
  }
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
