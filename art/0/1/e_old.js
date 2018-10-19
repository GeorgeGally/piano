rbvj = function () {
  ctx2.clearRect(0, 0, w, h);
  var grid = new particleEngine( 60, 30 );
  var engine = new particleEngine( 20, 2 );
  var hit_dist = 50;

  for ( var i = 0; i < grid.length; i++ ) {
    var g = grid.particles[ i ];
    g.sz = 5;
    g.start_sz = 6;
  }

  for ( var i = 0; i < engine.particles.length; i++ ) {
    p = engine.particles[ i ];
    p.pos.y = h;

    p.speed.x = 2;
    p.speed.y = random( 0.5, 2 );
    p.dir.x = 1;
    p.dir.y = -1;
    //console.log(p.speed.y);
  }

  draw = function () {

    ctx.background( 0 );
    ctx.fillStyle = "white";

    for ( var i = 0; i < grid.length; i++ ) {

      var g = grid.particles[ i ];
      for ( var j = 0; j < engine.length; j++ ) {
        var p = engine.particles[ j ];

        var d = Math.abs( getDist( g, p ) );
        if ( d < hit_dist ) {
          var target_sz = hit_dist - d + g.start_sz;
          if ( g.sz < target_sz ) g.sz = target_sz / 2;
        }



      }
    }

    moveParticles();
    drawGrid();
    //drawParticles();

  }

  function drawGrid() {
    for ( var i = 0; i < grid.length; i++ ) {
      var g = grid.particles[ i ];

      var c = Math.round( Sound.mapSound( g.sz, 35, 0, 7 ) );
      //console.log(c);
      ctx.fillStyle = colours.get(c);
      if (g.sz < 10) ctx.fillStyle = rgb(255);
      ctx.fillEllipse( g.pos.x, g.pos.y, g.sz, g.sz );
      if ( g.sz > g.start_sz ) g.sz = tween( g.start_sz, g.sz, 35 );
    }
  }

  function moveParticles() {
    for ( var i = 0; i < engine.particles.length; i++ ) {
      var p = engine.particles[ i ];
      p.pos.x += p.speed.x * p.dir.x;
      p.pos.y += p.speed.y * p.dir.y;
      //console.log(p.speed.y);
      var c = Math.round( Sound.mapSound( g.sz, engine.particles.length * 2, 0, 5 ) );
      p.sz = c;
      if ( p.pos.y < 0 ) p.pos.y = h;
      if ( p.pos.y > h ) p.pos.y = 0;
      if ( p.pos.x < 0 ) p.pos.x = w;
      if ( p.pos.x > w ) p.pos.x = 0;
    }
    //engine.update();
  }





  function getDist( p, p2 ) {
    return dist( p.pos.x, p.pos.y, p2.pos.x, p2.pos.y );
  }

}();
