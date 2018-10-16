rbvj = function () {

  var grid = new particleEngine( 15, 5 );
  var engine = new particleEngine( 25, 25 );
  var hit_dist = 285;
  ctx.lineWidth = 0.4;

  var color1 = '#67aeda';

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

    p.speed.y = random(1,3);
    p.speed.x = random(1,3);
    p.sz = 5;
    p.start_sz = 0;
    //if(i%2 == 0) p.dir.x = -1;
    p.dir.x = posNeg();
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
          hit_dist = Sound.mapSound( (Math.round( j + frameCount/100)) % engine.length, engine.length * 3, 0, 80);
          if(d < hit_dist) {
            var target_sz = Sound.mapSound(i, grid.length * 3, 0, hit_dist * 0.8)
            p.speed.x = Sound.mapSound(i, engine.length * 3, -2, 2)/ 2;
            p.speed.y = Sound.mapSound( (Math.round( j + frameCount/100)) % engine.length, engine.length * 3, -2, 2) /2;
            if (g.sz < target_sz) g.sz = target_sz * 2;
            if (p.sz < target_sz) p.sz = target_sz * 2;
            ctx.line(p.pos.x, p.pos.y, g.pos.x, g.pos.y);
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
      // ctx.fillMe( color1 );
      // ctx.fillCircle(g.pos.x, g.pos.y, g.sz, g.sz);
      // ctx.fillMe( 0 );
      // ctx.fillCircle(g.pos.x, g.pos.y, g.sz/3, g.sz/3);
      // ctx.fillMe( 0 );
      // ctx.fillCircle(g.pos.x, g.pos.y, g.sz/10, g.sz/10);
      ctx.strokeMe( colours.get(4) );
      ctx.fillMe( colours.get(4) );
      ctx.fillCircle(g.pos.x, g.pos.y, g.sz/15, g.sz/15);

      if (g.sz > g.start_sz) g.sz = tween(g.sz, g.start_sz, 45);
    }

  }


  function drawGrid(){
    for (var i = 0; i < grid.length; i++) {
      var g = grid.particles[i];

      // ctx.fillMe( color1 );
      // ctx.fillCircle(g.pos.x, g.pos.y, g.sz, g.sz);
      // ctx.fillMe( 0 );
      // ctx.fillCircle(g.pos.x, g.pos.y, g.sz/3, g.sz/3);
      ctx.fillMe( 255 );
      //ctx.fillCircle(g.pos.x, g.pos.y, 10, 10);
      // ctx.fillMe( color1 );
      // ctx.LfillEllipse(g.pos.x, g.pos.y, g.sz/15, g.sz/15);
      // ctx.strokeMe( 255, 0.3 );
      // ctx.strokeEllipse(g.pos.x, g.pos.y, g.sz, g.sz);
      // ctx.LstrokeEllipse(g.pos.x, g.pos.y, g.sz/5, g.sz/5);
      // ctx.LstrokeEllipse(g.pos.x, g.pos.y, g.sz/10, g.sz/10);
      if (g.sz > g.start_sz) g.sz = tween(g.sz, g.start_sz, 5);
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
      //p.pos.x += ( p.speed.x );
      p.pos.x = w/2 + Math.cos( (2 * (frameCount /100 + i ) * p.dir / 5 )) * 200;
      p.pos.y = h/2 + Math.sin( (2 * (frameCount /100 + i ) * p.dir / 5 )) * 200;
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