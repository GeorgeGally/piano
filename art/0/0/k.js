rbvj = function () {

  clearAll();
  var circs = [];
  var r = width / 14;
  var vol = 0;
  ctx.strokeStyle = rgb(255);
  ctx.lineWidth = 2;
  var gx = randomInt( 3, 25 );
  var gy = Math.floor( h / 15 );

  var engine = new particleEngine( gx, gy );


  function reset() {
    console.log( "reset" );
    gx = randomInt( 4, 15 );
    engine = new particleEngine( gx, gy );
    for ( var i = 0; i < engine.particles.length; i++ ) {
      var p = engine.particles[ i ];
      p.lw = random( 45 )
    }
  }

  reset();

  draw = function () {
    ctx.background( 0 );
    if ( chance( 50 ) && Sound.getBassVol() > 60 ) reset();
    for ( var i = 0; i < engine.particles.length; i++ ) {

      var p = engine.particles[ i ];
      vol = Sound.mapSound( i % 100, 100, -2, 2 ) - random( 0.1 );
      if ( vol > 0 ) p.pos.y = tween( p.pos.y, p.pos.y - vol, 30 );
      if ( p.pos.y > h ) p.pos.y = 0;
      if ( p.pos.y < 0 ) p.pos.y = h;
      //ctx.lineWidth = p.lw;

      if ( vol > 0 ) ctx.line( p.pos.x - engine.grid.spacing_x / 2, p.pos.y, p.pos.x + engine.grid.spacing_x / 2 - 5, p.pos.y );

    }

  }
}();
