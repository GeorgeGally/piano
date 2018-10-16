rbvj = function(){

var vol = 0;
var gx, gy;

var engine;
reset();

function reset() {
  console.log("reset");
  gx = randomInt(20, 85);
  gy = randomInt(20, 120);
  engine = new particleEngine(gx, gy);

}


draw = function() {

  ctx.background( 0 );

  if (chance(400)) reset();

  for (var i=0; i < engine.particles.length; i++){

    var p = engine.particles[i];
    p.pos.y -=2;
    if(p.pos.y < 0) p.pos.y = h;
    vol = Sound.mapSound(i%100, 100, 1, engine.grid.spacing_x - 2) - random(0.3);
    p.r = tween(p.r, vol, 22);
    // ctx.fillStyle = colours.get(map(p.r, 0, engine.grid.spacing_x, 0, colours.pool.length));
    ctx.fillStyle = rgb(255);
    if (p.r >= engine.grid.spacing_x) ctx.fillStyle = rgb(225, 0, 0);
    ctx.fillRect(p.pos.x - engine.grid.spacing_x/2, p.pos.y - engine.grid.spacing_y/2, p.r, engine.grid.spacing_y - 2);

  }

}

}();
