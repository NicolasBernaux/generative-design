// Sass
import "../styles/index.scss";

// Canvas
import Canvas from "./canvas/Canvas";

//Form
import "./Form";

if (document.querySelector("#container")) {
  const canvas = new Canvas();
}
