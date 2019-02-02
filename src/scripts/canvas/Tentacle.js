import Node from "./Node";
import CurveThroughPoints from "./CurveThroughPoints";

export default function Tentacle( settings, options ) {

  this.side = options.side || 'left';
  this.length = options.length || 10;
  this.radius = options.radius || 10;
  this.spacing = options.spacing || 20;
  this.friction = options.friction || 0.8;
  this.positionY = random(0, options.canvasHeight);

  this.nodes = [];
  this.outer = [];
  this.inner = [];
  this.theta = [];
  this.side = options.side;

  for (let i = 0; i < this.length; i++) {
    this.nodes.push(new Node());
  }

  this.move = function (y, canvasWidth, init) {

    this.nodes[0].y = y + this.positionY;

    if (init) {
      if (this.side === "left") {
        this.nodes[0].x = -10;
      } else {
        this.nodes[0].x = canvasWidth + 10;
      }

      let i, node;

      for (i = 1; i < this.length; i++) {

        node = this.nodes[i];
        node.x = this.nodes[0].x;
        node.y = y;
      }
    }
  };

  this.update = function () {

    let j, i, s, c, dx, dy, da, px, py, node, prev = this.nodes[0];
    let radius = this.radius * settings.thickness;
    let step = radius / this.length;

    for (i = 1, j = 0; i < this.length; i++, j++) {

      node = this.nodes[i];

      node.x += node.vx;
      node.y += node.vy;

      dx = prev.x - node.x;
      dy = prev.y - node.y;
      da = Math.atan2(dy, dx);

      px = node.x + cos(da) * this.spacing * settings.length;
      py = node.y + sin(da) * this.spacing * settings.length;

      node.x = prev.x - (px - node.x);
      node.y = prev.y - (py - node.y);

      node.vx = node.x - node.ox;
      node.vy = node.y - node.oy;

      node.vx *= this.friction * (1 - settings.friction);
      node.vy *= this.friction * (1 - settings.friction);

      // change the gravity
      node.vy += settings.wind;

      if (options.side === 'left') {
        node.vx += settings.gravity;
      } else {
        node.vx -= settings.gravity;
      }

      node.ox = node.x;
      node.oy = node.y;

      s = sin(da + HALF_PI);
      c = cos(da + HALF_PI);

      this.outer[j] = {
        x: prev.x + c * radius,
        y: prev.y + s * radius
      };

      this.inner[j] = {
        x: prev.x - c * radius,
        y: prev.y - s * radius
      };

      this.theta[j] = da;

      radius -= step;

      prev = node;
    }
  };

  this.draw = function (ctx) {

      let s, e;

      s = this.outer[0];
      e = this.inner[0];

      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      CurveThroughPoints(this.outer, ctx);
      CurveThroughPoints(this.inner.reverse(), ctx);
      ctx.lineTo(e.x, e.y);
      ctx.closePath();

      ctx.fillStyle = settings.tentaclesFill;
      ctx.fill();

      if (settings.thickness > 2) {
        ctx.strokeStyle = settings.tentaclesStroke;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };
};
