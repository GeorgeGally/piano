rbvj = function () {

  clearAll();
  var engine = new particleEngine( 22, 22 );

  var dir = 1;
  var radius = 200;
  var color1 = '#67aeda';
  ctx.strokeMe( 255 );
  ctx.lineWidth = 1;
  ctx.background( 0 );

  for ( var i = 0; i < engine.particles.length; i++ ) {
    p = engine.particles[ i ];
    p.speed.y = 4;
    p.speed.x = 4;
    p.sz = 2;
    p.sz2 = 2;
    //p.pos.x = -5;
    //p.pos.y = h + 5;
    p.old = new Vector( p.pos.x, p.pos.y )
    //p.old.x = p.pos.x;
    p.sw = 4;
    num = Math.round( map( i, 0, engine.particles.length, 0, colours.pool.length - 1 ) );
    console.log( num );
    p.c = colours.get( num );
    //p.c = rgba(randomInt(100, 255), randomInt(55), 0, 0.5 );
    p.start_sz = 0;
    p.s = 2;
    p.direction = 1;
    if ( i % 2 == 0 ) p.dir.y = 1;
  }



  draw = function () {

    ctx.background( 0, 0.5 );
    ctx2.clearRect( 0, 0, w, h );

    moveParticles();
    drawParticles();

    if ( chance( 50 ) ) dir *= -1;

  }




  function drawParticles() {
    for ( var i = 0; i < engine.length; i++ ) {
      var p = engine.particles[ i ];

      ctx.fillMe( p.c );
      ctx.fillCircle( p.pos.x, p.pos.y, p.sz, p.sz );

      ctx2.fillMe( 255 );
      ctx2.fillCircle( p.pos.x, p.pos.y, 5, 5 );
      //ctx.fillCircle(x, y, 10, 10);


    }

  }

  function getParticleColour(i){
    num = Math.round( map( i, 0, engine.particles.length, 0, colours.pool.length - 1 ) );
    //console.log( num );
    return colours.get( num );
  }

  function moveParticles() {

    var spectrum = Sound.spectrum
    var note = getNoteNumberFromFFT( spectrum );
    for ( var i = 0; i < engine.particles.length; i++ ) {
      note = Math.floor( note );
      var p = engine.particles[ i ];
      ctx.strokeMe( 255, 0.3 );
      ctx.line( p.pos.x, 0, p.pos.x, h );
      var sz = Sound.mapSound( i, engine.length * 2, 1, 20 );
      p.pos.y -= 4;
      p.sz = tween( p.sz, sz, 4 );
      p.sz2 = tween( p.sz2, 0, 60 );
      if ( sz > 29 ) {
        p.sz2 = 180;
      }
      if ( p.pos.x > w + 50 ) {
        p.pos.x = -50;
        p.old.x = -50;
        p.pos.y += random( -22, 22 );
        p.c = getColourFromNote();
      }
      if ( p.pos.y > h ) {
        p.pos.y = 0;
        p.c = getColourFromNote();
      }

      if ( p.pos.y < 0 ) {
        p.pos.y = h;
        p.c = getColourFromNote();
      }

    }

  }

  function getMyColour( i ) {
    var spectrum = Sound.spectrum;
    // var freq = getNoteFromFFT(spectrum);
    var note = getNoteNumberFromFFT( spectrum );
    //var c = Math.round (Sound.mapSound( i, engine.length * 2, 0, 5));
    var c = Sound.mapSound( i, 0, engine.length * 2, 0, colours.pool.length - 1 )
    //console.log(c);
    //console.log(colours.pool.length-1);
    //var c = Math.round(map(note, 0, 100, 0, colours.pool.length));
    //console.log(c);
    var col = colours2.get( c );
    //ctx.fill(col)
    return col;
  }

}();
