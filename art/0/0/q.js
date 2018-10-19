rbvj = function () {

  clearAll();
  colour_count = 3;
  colours = palettes [ colour_count ];

  var grid = new particleEngine( 5, 5 );
  var engine = new particleEngine( 5, 5 );
  var hit_dist = 55;
  ctx.lineWidth = 2;

  for (var i = 0; i < grid.length; i++) {
    var g = grid.particles[i];
    g.sz = 5;
    g.start_sz = 0;
    g.speed.y = 0;
    g.speed.x = random(1,8);
    g.c =  colours.get(Math.round(Sound.mapSound(i, grid.length, 0, colours.pool.length)));
  }

  for (var i = 0; i < engine.particles.length; i++) {
    p = engine.particles[i];
    //p.pos.y =  Math.sin(i/3000) * h;

    p.speed.y = 0;
    p.speed.x = random(1,8);
    p.dir.x = posNeg();
    p.sz = 5;
    p.start_sz = 0;
    //if(i%2 == 0) p.dir.x = -1;
    p.dir.y = posNeg();
    if(i%2 == 0) p.dir.y = 1;
    //console.log(p.speed.y);
  }


  draw = function() {

    ctx.background( 0 );

    for (var i = 0; i < grid.length; i++) {

      var g = grid.particles[i];
      g.c =  colours.get(Math.round(map(i, 0, grid.length, 0, colours.pool.length)));
      for (var j = 0; j < engine.length; j++) {
        var p = engine.particles[j];

        var d = Math.abs(getDist(g, p));
        hit_dist = Sound.mapSound( (Math.round( j + frameCount/100)) % engine.length, engine.length * 3, 0, 80);

          if(d < hit_dist) {
            var target_sz = Sound.mapSound(i, grid.length * 3, 0, hit_dist)
            p.speed.x = Sound.mapSound(i, engine.length * 3, -5, 5);
            p.speed.y = Sound.mapSound( (Math.round( j + frameCount/10)) % engine.length, engine.length * 3, -5, 5);
            if (g.sz < target_sz) g.sz = tween(g.sz, target_sz * 2, 25);
            if (p.sz < target_sz) p.sz = tween(p.sz, target_sz * 2, 25);
          }

      }
    }

    moveParticles();
    moveGrid();
    drawParticles();
    drawGrid();

  }

  function drawParticles(){
    for (var i = 0; i < engine.length; i++) {
      var g = engine.particles[i];
      ctx.fillMe( g.c );
      ctx.fillCircle(g.pos.x, g.pos.y, g.sz, g.sz);
      ctx.fillMe( 0 );
      ctx.fillCircle(g.pos.x, g.pos.y, g.sz/3, g.sz/3);
      ctx.fillMe( 255 );
      ctx.fillCircle(g.pos.x, g.pos.y, g.sz/5, g.sz/5);
      ctx.fillMe( g.c );
      ctx.LfillEllipse(g.pos.x, g.pos.y, g.sz/10, g.sz/10);

      if (g.sz > g.start_sz) g.sz = tween(g.sz, g.start_sz, 15);
    }

  }


  function drawGrid(){
    for (var i = 0; i < grid.length; i++) {
      var g = grid.particles[i];

      ctx.fillMe( g.c );
      ctx.fillCircle(g.pos.x, g.pos.y, g.sz, g.sz);
      ctx.fillMe( 0 );
      ctx.fillCircle(g.pos.x, g.pos.y, g.sz/3, g.sz/3);
      ctx.fillMe( 255 );
      ctx.fillCircle(g.pos.x, g.pos.y, g.sz/5, g.sz/5);
      ctx.fillMe( g.c );
      ctx.LfillEllipse(g.pos.x, g.pos.y, g.sz/10, g.sz/10);
      if (g.sz > g.start_sz) g.sz = tween(g.sz, g.start_sz, 15);
    }

  }

  function moveParticles(){
    for (var i = 0; i < engine.particles.length; i++) {
      var p = engine.particles[i];
      p.pos.x += ( p.speed.x * p.dir.x );
      p.pos.y += ( p.speed.y * p.dir.y );
      if (p.pos.y < 0) p.pos.y = h;
      if (p.pos.y > h) p.pos.y = 0;
      if (p.pos.x < 0) p.pos.x = w;
      if (p.pos.x > w) p.pos.x = 0;
    }

  }

  function moveGrid(){
    for (var i = 0; i < grid.length; i++) {
      var p = grid.particles[i];
      p.pos.x += ( p.speed.x );
      p.pos.y += ( p.speed.y );
      if (p.pos.y < 0) p.pos.y = h;
      if (p.pos.y > h) p.pos.y = 0;
      if (p.pos.x < 0) p.pos.x = w;
      if (p.pos.x > w) p.pos.x = 0;
    }

  }




  function getDist(p, p2){
    return dist(p.pos.x, p.pos.y, p2.pos.x, p2.pos.y);
  }


}();
