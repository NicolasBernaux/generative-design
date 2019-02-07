// Sass
import "../styles/index.scss";

// Canvas
import Canvas from "./canvas/Canvas";

//Form
import Form from "./form/Form";
import { ask } from "../utils/mockAsks";
import { Share } from "./share/Share";
import { Compatibility } from "./Compatibility/Compatibility";
import { endSentence } from "./endSentence/EndSentences";
import EndTemplate from './EndTemplate';
import EndSentences from './endSentence/EndSentences';

const canvasContainer = document.querySelector("#canvas");
const buttonStart = document.querySelector(".button--start");
let canvas;

if (canvasContainer && buttonStart) {
  // Launch the game
  buttonStart.addEventListener("click", (e) => {
    e.preventDefault();

    const soundStart = new Audio("public/audio/sound_clic_start_questions.mp3");
    soundStart.play();
    // Init the form
    let score = 0;
    const formulaire = new Form(ask);
    formulaire.render();

    // Launch the canvas
    document.querySelector(".home-hero").classList.add("play");
    canvas = new Canvas(canvasContainer, ask);
  });
}

// On score changing
document.addEventListener("changeScore", (e) => {
  e.preventDefault();

  if (e.detail.progression < 1) {
    // if game is not over
    canvas.update(e.detail.progression, e.detail.score);
  } else {
    // else if game is over
    canvas.update(e.detail.progression, e.detail.score);
    canvas.animEnd();

    const interval = setInterval(() => {
      canvas.update(e.detail.progression, e.detail.score, false);
      e.detail.progression++;

      if (e.detail.progression >= 5) {
        clearInterval(interval);

        setTimeout(() => {
          new EndTemplate(
            new EndSentences(
              e.detail.score,
              'public/videos/Venom.mp4',
              'public/videos/Carnage.mp4'
            ),
            document.querySelector(".home-hero")
          );
        }, 3000);
      }
    }, 100);
  }
});

// Test browser
const compatibility = new Compatibility();
compatibility.addClass();
