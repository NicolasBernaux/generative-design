let setting = {};

function setup() {
  setting.bgColor = color(160)
  setting.rectColor = color(237, 0, 62, 10)
  setting.startX = 75;
  setting.startY = 75;
  setting.rectCount = 15;
  setting.rectWidth = 450 / setting.rectCount;
  setting.rectMaxHeight = 180;
  // setting.seed = random(1500);
  createCanvas(600, 600);
  background(setting.bgColor);
}

function draw() {
  // randomSeed(setting.seed);
  noStroke();
  fill(setting.rectColor);
  for (let i = 0; i < setting.rectCount; i++) {
    let x = setting.startX + i * setting.rectWidth;
    rect(x, setting.startY, setting.rectWidth, random(setting.rectMaxHeight));
  }
}
