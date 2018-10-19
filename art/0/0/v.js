rbvj = function () {

  clearAll();

  var grid_w = 30;
  var grid_h = 30;

  var blocks = new particleEngine(grid_w, grid_h);
  var row = 0;
  for (var i = 0; i < blocks.particles.length; i++) {
    var b = blocks.particles[i];
    //b.pos = new Vector(grid[i].x, grid[i].y);
    b.speed = new Vector(2, 2);
    b.c = rgb(0);
    // b.c =  (i%2 == 0) ? rgb(0): rgb(255);
    b.w = w/grid_w;
    b.h = h/grid_h;
    b.s = 0;
  }

  draw = function (){
    //ctx.background(0);
    blocks.update();
    if (chance(20)) resetSpeed();
    for (var i = 0; i < blocks.particles.length; i++) {
      var b = blocks.particles[i];
      //if(b.pos.x > w/2 - 120 && b.pos.x < w/2 + 120 && b.pos.y > h/2 - 120 && b.pos.y < h/2 + 120) {
      if (chance(2500)) {
        var _s = Sound.mapSound(b.me, blocks.particles.length*2, 0, 255);
        if(_s < 80) {
          b.c = rgb(0);
        } else if(_s < 200) {
          b.c = rgb(_s*2);
          //b.c = rgb(0);
        } else {
          b.c = rgb(225, 0, 0);

        }
      }
      ctx.fillStyle = b.c;
      ctx.fillEllipse(b.pos.x, b.pos.y, b.w/2.2, b.w/2.2);
    }
    mirror();
    mirror(2);
    mirror();
    mirror(2);
  }


  function resetSpeed(){
    var s = new Vector(random(-3,3), random(-3,3));
    for (var i = 0; i < blocks.particles.length; i++) {
      blocks.particles[i].speed = s;
    }
  }





}();
