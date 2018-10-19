rbvj = function () {

  ctx.lineWidth= 1;
  var grid = new particleEngine( 30, 22 );
  var engine = new particleEngine( 10, 10 );
  var hit_dist = 55;
  var target_sz = 10;
  for (var i = 0; i < grid.length; i++) {
    var g = grid.particles[i];
    g.sz = 5;
    g.start_sz = 0;
  }

  for (var i = 0; i < engine.particles.length; i++) {
    p = engine.particles[i];
    //p.pos.y =  Math.sin(i/3000) * h;

    p.speed.y = 0;
    p.speed.x = random(0.5,3);
    p.dir.x = 1;
    p.sz = 5;
    p.start_sz = 0;
    //if(i%2 == 0) p.dir.x = -1;
    p.dir.y = posNeg();
    if(i%2 == 0) p.dir.y = 1;
    //console.log(p.speed.y);
  }


  draw = function () {

    ctx.background( 0 );

    for (var i = 0; i < grid.length; i++) {

      var g = grid.particles[i];
      for (var j = 0; j < engine.length; j++) {
        var p = engine.particles[j];
          var d = Math.abs(getDist(g, p));
          hit_dist = tween(hit_dist, Sound.mapSound(j, engine.length * 3, 0, 60), 30);
          if(d < hit_dist) {
            if(Sound.getVol() > 0) target_sz = tween(target_sz, Sound.mapSound(i, grid.length * 3, 0, hit_dist * 0.9), 80);
            //var target_sz = hit_dist;
            if (g.sz < target_sz) g.sz = target_sz * 2;
            if (p.sz < target_sz) p.sz = target_sz * 2;
            //ctx.strokeMe( 100, 0, 0 )
            //ctx.line( g.pos.x, g.pos.y, p.pos.x, p.pos.y );
          }
        }
    }

    moveParticles();
    drawParticles();
    drawGrid();

  }

  function drawParticles(){
    for (var i = 0; i < engine.length; i++) {
      var g = engine.particles[i];
      ctx.fillMe( 80, 148, 185, 0.6 );
      ctx.fillCircle(g.pos.x, g.pos.y, g.sz, g.sz);
    }

    for (var i = 0; i < engine.length; i++) {
      var g = engine.particles[i];
      ctx.fillMe( 0 );
      ctx.fillCircle(g.pos.x, g.pos.y, g.sz/3, g.sz/3);
      ctx.fillMe( 255 );
      ctx.fillCircle(g.pos.x, g.pos.y, g.sz/5, g.sz/5);
      ctx.fillMe( 80, 148, 185, 0.4 );
      ctx.fillCircle(g.pos.x, g.pos.y, g.sz/10, g.sz/10);

      if (g.sz > g.start_sz) g.sz = tween(g.sz, g.start_sz, 35);
    }

  }


  function drawGrid(){
    for (var i = 0; i < grid.length; i++) {
      var g = grid.particles[i];
      ctx.strokeMe( 255, 0.4 );
      ctx.strokeEllipse(g.pos.x, g.pos.y, g.sz, g.sz);
      ctx.strokeCircle(g.pos.x, g.pos.y, g.sz/5, g.sz/5);
      ctx.strokeCircle(g.pos.x, g.pos.y, g.sz/10, g.sz/10);
      if (g.sz > g.start_sz) g.sz = tween(g.sz, g.start_sz, 35);
    }

  }

  function moveParticles(){
    for (var i = 0; i < engine.particles.length; i++) {
      var p = engine.particles[i];
      p.pos.x += ( p.speed.x * p.dir.x );
      //p.pos.x = p.start.x/2 + w/2 + Math.sin ((i + frameCount)/160) * (w/2 + p.start.x/2);
      p.pos.y += ( p.speed.y * p.dir.y );
      if (p.pos.y < 0) p.pos.y = h;
      if (p.pos.y > h) p.pos.y = 0;
      if (p.pos.x < 0) p.dir.x *= -1;
      if (p.pos.x > w) p.dir.x *= -1;
    }

  }




  function getDist(p, p2){
    return dist(p.pos.x, p.pos.y, p2.pos.x, p2.pos.y);
  }


}();
