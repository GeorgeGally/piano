rbvj = function () {

  var engine = new particleEngine(100, 8);
  var particles = engine.particles;
  ctx.lineWidth = 2;
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    //p.pos.y-= engine.grid.spacing.y/4 + 80;
    p.start.y += engine.grid.spacing.y/2;
  }

  draw = function(){

    ctx.background(0);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.pos.x = p.start.x + Math.cos((i + frameCount)/20) * (engine.grid.spacing.x*4);
      p.pos.y = p.start.y + Math.sin((i/5 + frameCount)/40) * engine.grid.spacing.y;
      ctx.strokeStyle = rgb(255);
      ctx.line(p.pos.x, p.pos.y, p.start.x, p.start.y);
    }

  }



}();
