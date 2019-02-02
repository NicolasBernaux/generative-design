// Sass
import '../styles/index.scss';

// Canvas
import Canvas from './canvas/Canvas';

//Form
import Form from './form/Form';
import { ask } from '../utils/mockAsks';

const canvasContainer = document.querySelector('#canvas');
const buttonStart = document.querySelector('.button--start');
let canvas;

if (canvasContainer && buttonStart) {
  // Launch the game
  buttonStart.addEventListener('click', () => {

    // Init the form
    let score = 0;
    const formulaire = new Form(ask);
    formulaire.render();

    // Launch the canvas
    document.querySelector('.home-hero').classList.add('play');
    canvas = new Canvas(canvasContainer);
  });
}

document.addEventListener('changeScore', (e) => {
  if (e.detail.progression < 1) {
    canvas.update(e.detail.progression, e.detail.score);
  } else {
    const interval = setInterval(() => {
      canvas.update(e.detail.progression, e.detail.score, false);
      e.detail.progression++;
      if (e.detail.progression >= 5) {
        clearInterval(interval);
      }
    }, 100);
  }
});
