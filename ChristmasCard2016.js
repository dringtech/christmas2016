tree = function(col, depth) {
  
}

function setup() {
  createCanvas(600, 400);
  hills = (function hills(col) {
    h = {}
    scaling = 0.005;
    border = 100;
    skyline = Array.apply(null, Array(width))
      .map(function (_, i) { return map(noise(i*scaling),0,1,border,height-border); });
    
    h.draw = function() {
      stroke(col);
      skyline.map(function(h, i) {line(i,height,i,h)})
    }
    return h
  }('Azure'));
  storm = new SnowStorm();
}

function draw() {
  background('MidnightBlue')
  hills.draw();
  storm.run();
}