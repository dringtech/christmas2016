var scaleMap = function(note) {
  var scale = [0, 2/12, 4/12, 5/12, 7/12, 9/12, 12/12];
  var octave = int(note);
  var part = note % 1;
  closest = scale
    .map(function(num) { return Math.abs(part-num); })
    .reduce(function(a, b, i, diffs) { return diffs[a] < diffs[i] ? a : i; });
  return Math.pow(2, octave + scale[closest]);
};

var silence = (function() {
  var make_noise = false;
  return {
    off: function() {return make_noise;},
    toggle: function () {
      make_noise = ! make_noise;
      console.log();
    }
  };
}());

var ping = (function() {
  var env = (function() {
    var env = new p5.Env();
    env.setADSR(0.005, 0.001, 0.1, 0.1);
    env.setRange(0.2, 0.0);
    env.setExp();
    return env;
  }());

  var oscFactory = function(env) {
    var osc = new p5.Oscillator();
    osc.setType('triangle');
    osc.amp(0);
    osc.start();
    return osc;
  };

  var osc1 = oscFactory(env);
  var osc2 = oscFactory(env);

  var delay = new p5.Delay();
  delay.process(osc1, 0.1, 0.5, 1000);
  delay.process(osc2, 0.1, 0.5, 1000);

  var reverb = new p5.Reverb();
  reverb.connect(delay);

  return {
    play: function(pos) {
      var note = map(pos/width,0,1,1,Math.sqrt(5));
      var freq = scaleMap(note)*220;
      osc1.freq(freq);
      osc2.freq(freq*1.02);
      env.setInput(osc1);
      env.setInput(osc2);
      if ( silence.off() ) env.play();
    }
  };
}());

var Flake = function(position) {
  this.velocity = createVector(random(-0.1, 0.1), random(0.5, 1));
  this.position = position.copy();
  this.noisePos = createVector(random(0,1000), random(0, 1000));
  this.increment = random(0.001, 0.01);
  ping.play(this.position.x);
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
    this.nextArrival = randomGaussian(20,5) + 10;
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
