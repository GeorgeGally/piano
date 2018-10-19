rbvj = function () {

  ctx.background( 0 );
  var engine = new particleEngine( 80, 60 );
  var row = 0;
  for ( var i = 0; i < engine.particles.length; i++ ) {
    var b = engine.particles[ i ];
    //b.position = new Vector(grid[i].x, grid[i].y);
    b.speed = new Vector( 0, -2 );
    b.c = rgb( 0 );
    // b.c =  (i%2 == 0) ? rgb(0): rgb(255);
    b.w = engine.grid.spacing.x;
    b.h = engine.grid.spacing.y;
    b.s = 0;
  }

  draw = function () {

    ctx.background( 0 );
    //engine.draw(ctx);
    var s = Sound.getVol(0, 2);
    for ( var i = 0; i < engine.particles.length; i++ ) {
      var b = engine.particles[ i ];
      b.pos.y -= s;
      if ( b.pos.y < 0 ) b.pos.y = h;

      if ( b.pos.y >= h - 20 ) {

        b.c = getNoteGrey();

      } else if ( b.pos.y < h - 220 && b.pos.y > h - 240 ) {
        // var _s = Sound.mapSound(b.me, engine.particles.length);

        b.c = getNoteColour();
      }
      ctx.fillStyle = b.c;
      ctx.fillRect( b.pos.x, b.pos.y, b.w - 2, b.h - 2 );
    }
  }

  function getNoteColour() {
    var spectrum = Sound.spectrum;
    var freq = getNoteFromFFT( spectrum );
    var note = getNoteFreqPerc( spectrum );
    //console.log(spectrum[note]);
    var note1 = ( freq.substring( 0, 1 ) )
      .charCodeAt( 0 ) - 65;
    num = Math.round( map( note1, 0, 7, 0, 4 ) );
    return colours.get( num );
  }

  function getNoteGrey() {
    var spectrum = Sound.spectrum;
    var freq = getNoteFromFFT( spectrum );
    var note = getNoteFreqPerc( spectrum );
    //console.log(spectrum[note]);
    var note1 = ( freq.substring( 0, 1 ) )
      .charCodeAt( 0 ) - 65;
    num = Sound.mapSound( note1, 7, 0, 55 );
    //console.log(num);
    return rgb( num );
  }

}();
