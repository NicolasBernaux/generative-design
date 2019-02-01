// Libs
import "./lib/sketch.min";

// Elements
import Tentacle from "./Tentacle";

let settings = {
  interactive: false,
  thickness: 30,
  tentacles: 60,
  friction: 0.02,
  gravity: 1,
  tentaclesFill: '#000000',
  tentaclesStroke: '#121212',
  length: 70,
  pulse: true,
  wind: -0.5
};

let ease = 0.1;
let modified = false;
let tentacles = [];
let center = { x:0, y:0 };
let scale = window.devicePixelRatio || 1;

let sketch = Sketch.create({

  retina: 'auto',

  container: document.getElementById( 'container' ),

  setup: function() {

    center.x = this.width / 2;
    center.y = this.height / 2;

    let tentacle;

    for ( let i = 0; i < settings.tentacles; i++ ) {

      tentacle = new Tentacle(
        settings,
        {
        side: 'righ',
        length: random( 19, 20 ),
        radius: random( 0.05, 1.0 ),
        spacing: random( 0.2, 1.0 ),
        friction: random( 0.77, 0.88 )
      });

      tentacle.move( center.x, center.y, true );
      tentacles.push( tentacle );
    }
  },

  update: function() {

    let t, cx, cy;

    t = this.millis * 0.001;

    if ( settings.pulse ) {
      window.setTimeout(() => {
      center.y += random( 200, 500 );
      },2000);
    }

    if ( settings.interactive ) {

      ease += ( 0.7 - ease ) * 0.05;

      center.x += ( this.mouse.x / scale - center.x ) * ease;
      center.y += ( this.mouse.y / scale - center.y ) * ease;

    } else {

      t = this.millis;
      cx = this.width * 0.5;
      cy = this.height * 0.5;

      // Calcul for the default mouvement
      center.x = cx + sin( t * 0.002 ) * cos( t * 0.00005 ) * cx * 0.5;
      center.y = cy + sin( t * 0.003 ) * tan( sin( t * 0.0003 ) * 1.15 ) * cy * 0.4;
    }

    let px, py, theta, tentacle;
    let step = TWO_PI / settings.tentacles;

    for ( let i = 0;  i < settings.tentacles; i++ ) {

      tentacle = tentacles[i];

      theta = i * step;

      px = cos( theta ) ;
      py = sin( theta ) ;

      tentacle.move( center.x + 100 + px, center.y + py * (i*12) );
      tentacle.update();
    }
  },

  draw: function() {
    this.fillStyle = '#222222';
    this.fillRect(0, 0, this.width, this.height);

    // draw tentacules
    for ( let i = 0, n = settings.tentacles; i < n; i++ ) {
      tentacles[i].draw( this );
    }
  },

  mousedown: function() {

      settings.interactive = true;

      if ( !modified ) {
        settings.length = 60;
        settings.wind = 0.0;
      }
  },
});
