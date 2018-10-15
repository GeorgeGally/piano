rbvj = function () {

  var vol = 0;

  ctx.lineWidth = 1;
  var engine, gx;
  var gy = Math.floor( h / 10 )


  reset();

  function reset() {
    console.log( "reset" );
    gx = randomInt( 2, 10 );
    engine = new particleEngine( gx, gy );
    engine.setSize(10);
  }


  draw = function () {
    if ( chance( 200 ) ) reset();
    ctx.background( 0 );
    for ( var i = 0; i < engine.particles.length; i++ ) {
      var p = engine.particles[ i ];
      vol = Math.round(Sound.mapSound( i, engine.particles.length * 3, 0, colours4.pool.length-1 ));
      ctx.fillStyle = rgb( colours4.get(vol) );
      p.sz = tween(p.sz, vol * 4, 20);
      ctx.fillRect( p.pos.x - ( engine.grid.spacing_x - 10 ) / 2, p.pos.y, engine.grid.spacing_x - 10, p.sz );

    }

  }

}();
