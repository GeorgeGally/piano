rbvj = function () {

  clearAll();

  var grid = new particleEngine( 1, 1 );
  var engine = new particleEngine( 1, 2 );
  var hit_dist = 345;
  ctx.lineWidth = 0.5;
  var dir = 1;
  var radius = 200;
  var color1 = '#67aeda';
  ctx.strokeMe( 255 );
  var mode = 0;
  var blur = 0;

  for ( var i = 0; i < grid.length; i++ ) {
    var g = grid.particles[ i ];
    g.sz = 5;
    g.start_sz = 0;
    g.speed = new Vector( random( 1, 2 ), random( 1, 2 ) );
    g.dir = -1;
  }

  for ( var i = 0; i < engine.particles.length; i++ ) {
    p = engine.particles[ i ];
    //p.pos.y =  Math.sin(i/3000) * h;

    p.speed.y = 1;
    p.speed.x = 1;
    p.sz = random( 10, 200 );
    p.sw = 8;
    // p.c = randomGrey(0, 225, 0.1 );
    p.c = rgba( randomInt( 100, 255 ), randomInt( 55 ), 0, 0.5 );
    p.start_sz = 0;
    //if(i%2 == 0) p.dir.x = -1;
    p.dir.x = posNeg();
    p.dir.y = posNeg();
    p.direction = 1;
    if ( i % 2 == 0 ) p.dir.y = 1;
    //console.log(p.speed.y);
  }



  draw = function () {

    if ( blur ) {
      ctx.background( 0, 0.09 );
    } else {
      ctx.background( 0 );

    }

    if ( chance( 500 ) ) mode = ( mode + 1 ) % 3;

    if ( chance( 500 ) ) {
      blur = !blur;
      if ( !blur ) mode = ( mode + 1 ) % 3;
    }

    if ( Sound.getVol() > 60 && frameCount % 16 == 0 ) {
      var c = getColourFromNote();
      //ctx.strokeMe( colours.get(c) );
      engine.add();
      engine.last.sz = 10;
      engine.last.c = c;
      engine.last.direction = dir;
    }
    moveParticles();
    drawParticles();
    if ( chance( 200 ) ) dir *= -1;

  }

  function drawParticles() {
    for ( var i = 0; i < engine.length; i++ ) {
      var g = engine.particles[ i ];
      ctx.strokeMe( g.c );

      // if (g.direction == -1) {
      var f = ( frameCount / 280 ) % 360;
      var x = w / 2 + Math.cos( g.direction * f ) * w / 2;

      var y = h / 2;
      ctx.lineWidth = 1;
      if ( mode == 0 ) {
        ctx.strokeCircle( x, y, g.sz, g.sz );
      } else if ( mode == 1 ) {
        ctx.centreStrokeRect( x, y, g.sz, g.sz );
      } else {
        ctx.strokePolygon( x, y, 3, g.sz );
      }

    }

  }




  function moveParticles() {
    for ( var i = 0; i < engine.particles.length; i++ ) {
      var p = engine.particles[ i ];
      var sz = Sound.mapSound( i, engine.length * 2, 0, 25 );
      // p.sz = tween(p.sz, p.sz + sz, 4);
      p.sz += 4;
      if ( p.sz > w * 2.5 ) engine.delete( p.me );

    }

  }

}();
