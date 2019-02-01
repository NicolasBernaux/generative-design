// Sass
import '../styles/index.scss';

// Canvas
import Canvas from './canvas/Canvas';

if (document.querySelector('#container')) {
    const canvas = new Canvas();
}
