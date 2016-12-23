treeFactory = function(col, depth) {
  var tree = {};
  var xPos = random(width);
  var position = createVector(xPos, random(height, hills.horizon(xPos)));
  tree.draw = function() {
    fill(col);
    noStroke();
    ellipse(position.x, position.y, 20, 20);
  };
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
  forest = (function(count) {
    var forest = {};
    var trees = [];
    for (var i = 0; i<count; i++) {
      trees.push(treeFactory('Green', random(10)));
    }
    forest.draw = function() {
      trees.forEach( function(item) { item.draw(); });
    };
    return forest;
  }(5));
  storm = new SnowStorm();
}

function draw() {
  background('MidnightBlue');
  hills.draw();
  forest.draw();
  storm.run();
}
