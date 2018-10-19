rbvj = function () {

  var grid = new particleEngine( 1, 100 );
  var engine = new particleEngine( 30, 20 );
  var hit_dist = 345;
  ctx.lineWidth = 0.2;
  var dir = 1;
  var radius = 200;
  var color1 = '#67aeda';
  ctx.strokeMe( 255 );

  for (var i = 0; i < grid.length; i++) {
    var g = grid.particles[i];
    g.sz = 5;
    g.start_sz = 0;
    g.speed = new Vector(random(1,8), random(1,8));
    g.dir = -1;
  }

  for (var i = 0; i < engine.particles.length; i++) {
    p = engine.particles[i];
    //p.pos.y =  Math.sin(i/3000) * h;

    p.speed.y = 4;
    p.speed.x = 4;
    p.sz = random(10, 200);
    p.sw = randomInt(1,10);
    p.c = randomGrey(0, 225, 0.1 );
    p.start_sz = 0;
    //if(i%2 == 0) p.dir.x = -1;
    p.dir.x = posNeg();
    p.dir.y = posNeg();
    p.direction = posNeg();
    if(i%2 == 0) p.dir.y = 1;
    //console.log(p.speed.y);
  }


  draw = function () {

    ctx.background( 0, 0.5 );

    moveParticles();
    drawParticles();


  }

  function drawParticles(){
    for (var i = 0; i < engine.length; i++) {
      var g = engine.particles[i];
      ctx.fillMe( g.c );
      // ctx.fillCircle(g.pos.x, g.pos.y, g.sz, g.sz);
      // ctx.fillMe( 0 );
      // ctx.fillCircle(g.pos.x, g.pos.y, g.sz/3, g.sz/3);
      ctx.strokeMe( 0 );
      ctx.lineWidth = g.sw;
      if (g.direction == -1) {
        ctx.strokeCircle(w/2, h/2, g.sz, g.sz);
      } else {
        ctx.fillCircle(w/2, h/2, g.sz, g.sz);
      }

    }

  }




  function moveParticles(){
    for (var i = 0; i < engine.particles.length; i++) {
      var p = engine.particles[i];
      var sz = Sound.mapSound( i, engine.length * 2, 0, 15);
      p.sz = tween(p.sz, p.sz + sz, 10);
      if (p.sz > w) p.sz = 0;

    }

  }



}();
