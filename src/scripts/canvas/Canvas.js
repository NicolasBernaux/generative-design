
// Libs
import "../lib/sketch.min";

// Elements
import Tentacle from "./Tentacle";

export default function Canvas() {
  // Tentacles settings
  let settings = {
    interactive: false,
    thickness: 30,
    tentacles: 120,
    friction: 0.02,
    gravity: 0.1,
    tentaclesFill: '#000000',
    tentaclesStroke: '#4c4c4c',
    length: 30,
    pulse: true,
    wind: 0,
  };

// Setup parametters
  let tentacles = [];
  let position = { x:0, y:0 };
  let backgroundColor = '#F0F0F0F0';

  let sketch = Sketch.create({

    retina: false,

    container: document.getElementById( 'container' ),

    setup: function() {
      this.tentaculesMiddle = settings.tentacles / 2;
      this.tentaculesSpacing = 14;

      position.x = this.width;
      position.y = this.height;

      let tentacle;

      for ( let i = 0; i < settings.tentacles; i++ ) {
        let side;
        if (this.tentaculesMiddle > i ) {
          side = 'left';
        } else {
          side = 'right';
        }
        tentacle = new Tentacle(
          settings,
          {
            side: side,
            length: random( 19, 20 ),
            radius: random( 0.05, 1.0 ),
            spacing: random( 0.2, 1.0 ),
            friction: random( 0.77, 0.88 ),
          });

        tentacle.move( position.x, position.y, true );
        tentacles.push( tentacle );
      }
    },

    update: function() {

      let t, cx, cy;

      t = this.millis * 0.001;

      if ( settings.pulse ) {
        position.y = random( -20, 20 );
      }
      t = this.millis;
      cx = this.width * 0.5;
      cy = this.height * 0.5;

      let px, py, theta, tentacle;
      let step = TWO_PI / settings.tentacles;

      for ( let i = 0;  i < settings.tentacles; i++ ) {

        tentacle = tentacles[i];

        theta = i * step;

        px = cos( theta );
        py = sin( theta );

        if (tentacle.side === 'left') {
          tentacle.move(0 /* + pourcentage question*/, position.y + (i * this.tentaculesSpacing) );
        } else {
          tentacle.move( this.width  /* - pourcentage question*/, position.y + ((i - this.tentaculesMiddle) * this.tentaculesSpacing) );
        }
        tentacle.update();
      }
    },

    draw: function() {
      this.fillStyle = backgroundColor;
      this.fillRect(0, 0, this.width, this.height);

      // draw tentacules
      for ( let i = 0, n = settings.tentacles; i < n; i++ ) {
        tentacles[i].draw( this );
      }
    },

    resize: function() {
      position.x = this.width;
      position.y = this.height;
    }
  });
};
