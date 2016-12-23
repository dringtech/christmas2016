var Flake = function(position) {
  this.velocity = createVector(random(-0.1, 0.1), random(0.5, 1));
  this.position = position.copy();
  this.noisePos = createVector(random(0,1000), random(0, 1000));
  this.increment = random(0.001, 0.01);
};

Flake.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Flake.prototype.update = function(){
  this.noisePos.add(this.increment, this.increment);

  this.position.add(
    map(noise(this.noisePos.x),0,1,-1,1),
    map(noise(this.noisePos.y),0,1,-0.5,1)
  );
  this.position.add(this.velocity);
};

// Method to display
Flake.prototype.display = function() {
  fill('white');
  noStroke();
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Flake.prototype.isDead = function(){
  if (this.position.y > height + 20) {
    return true;
  } else {
    return false;
  }
};

var SnowStorm = function() {
  this.flakes = [];
  this.nextArrival = 0;
};

SnowStorm.prototype.addFlake = function() {
  this.flakes.push(new Flake(createVector(random(width), -20)));
};

SnowStorm.prototype.run = function() {
  if ( this.nextArrival <= 0 ) {
    this.addFlake();
    this.nextArrival = randomGaussian(20) + 10;
  } else {
    this.nextArrival--;
  }
  for (var i = this.flakes.length-1; i >= 0; i--) {
    var f = this.flakes[i];
    f.run();
    if (f.isDead()) {
      this.flakes.splice(i, 1);
    }
  }
};
