treeFactory = function(x, y) {
  var tree = {};
  var position = createVector(x, y);
  var green = lerpColor(
                color('LimeGreen'),
                color('DarkGreen'),
                map(y, height, height*0.5, 0, 1));
  tree.draw = function() {
    push();
    strokeWeight(4);
    translate(position.x, position.y);
    scale(map(position.y,height,height*0.5,2,0.5));
    translate(0,-50);
    stroke('Brown');
    line(0, 0, 0, 50);
    stroke(green);
    fill(green);
    triangle(0, 0, 5, 10, -5, 10);
    translate(0, 10);
    triangle(0, 0, 10, 15, -10, 15);
    translate(0, 10);
    triangle(0, 0, 15, 20, -15, 20);
    pop();
  };
  tree.depth = position.y;
  return tree;
};

var hills;
var storm;
var cnv;

function setup() {
  cnv = createCanvas(500, 300);
  cnv.canvas.id = 'snowglobe';
  cnv.parent('sketch-holder');
  hills = hillFactory('PowderBlue');
  forest = (function(spacing) {
    var forest = {};
    var trees = [];
    var spacingFn = function() {
      randomGaussian(spacing);
    };
    for (var xPos  = randomGaussian(spacing/2, spacing*0.7);
             xPos < width;
             xPos += randomGaussian(spacing, spacing*0.7) ) {
      var yPos = map(noise(xPos*100),0,1,height, hills.horizon(xPos));
      trees.push(treeFactory(xPos, yPos));
    }
    trees.sort(function(a, b) { return a.depth - b.depth; });
    forest.draw = function() {
      trees.forEach( function(item) { item.draw(); });
    };
    return forest;
  }(50));

  storm = new SnowStorm();
}

function draw() {
  background('MidnightBlue');
  hills.draw();
  forest.draw();
  storm.run();
}
