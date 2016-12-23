hillFactory = function hills(col) {
  var color = col;
  var h = {};
  var scaling = 0.003;
  var border = 100;
  var skyline = Array.apply(null, Array(width))
    .map(function (_, i) { return map(noise(i*scaling),0,1,border,height-border); });

  h.draw = function() {
    stroke(col);
    skyline.map(function(h, i) {line(i,height,i,h);});
  };
  h.horizon = function(x) {
    return skyline[int(x)];
  };
  return h;
};
