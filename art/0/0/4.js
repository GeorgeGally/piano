rbvj = function() {

  ctx2.font="10px Arial";
  var grid = new particleEngine( 60, 40 );
  var engine = new particleEngine( 5, 5 );
  var hit_dist = 55;

  for (var i = 0; i < grid.length; i++) {
    var g = grid.particles[i];
    g.sz = 5;
    g.start_sz = 0;
  }

  for (var i = 0; i < engine.particles.length; i++) {
    p = engine.particles[i];
    //p.pos.y =  Math.sin(i/3000) * h;

    p.speed.y = 5;
    p.speed.x = random(1,5);
    p.dir.x = 1;
    //if(i%2 == 0) p.dir.x = -1;
    p.dir.y = -1;
    if(i%2 == 0) p.dir.y = 1;
    //console.log(p.speed.y);
  }


  draw = function() {

    ctx.background( 0);
    ctx.fillStyle = colours4.get(1);
    ctx.strokeStyle = colours4.get(1);

    for (var i = 0; i < grid.length; i++) {

      var g = grid.particles[i];
      for (var j = 0; j < engine.length; j++) {
        var p = engine.particles[j];
          var d = Math.abs(getDist(g, p));
          hit_dist = Sound.mapSound(j, engine.length * 2, 0, 90);
          if(d < hit_dist) {
            var target_sz = Sound.mapSound(i, grid.length * 2, 0, 10)
            //var target_sz = hit_dist;
            if (g.sz < target_sz) g.sz = target_sz;
            ctx.line( g.pos.x, g.pos.y, p.pos.x, p.pos.y );
          }
        }
    }

    moveParticles();
    drawGrid();

  }

  function drawGrid(){
    for (var i = 0; i < grid.length; i++) {
      var g = grid.particles[i];
      ctx.fillEllipse(g.pos.x, g.pos.y, g.sz, g.sz);
      if (g.sz > g.start_sz) g.sz = tween(g.start_sz, g.sz, 55);
      //g.sz-= 2;
    }
  }

  function moveParticles(){
    for (var i = 0; i < engine.particles.length; i++) {
      var p = engine.particles[i];
      p.pos.x += ( p.speed.x * p.dir.x );
      //p.pos.x = w/2 + Math.sin ((i + frameCount)/160) * w/2;
      p.pos.y += ( p.speed.y * p.dir.y );
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
