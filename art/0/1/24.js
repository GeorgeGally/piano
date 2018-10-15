rbvj = function () {

  // var colours = new colourPool()
  //   .add( '#ECECEC' )
  //   //.add('#CCCCCC')
  //   .add( '#CCFFCC' )
  //   .add( '#333333' )
  //   .add( '#0095a8' )
  //   .add( '#00616f' )
  //   .add( '#FF3300' )
  //   .add( '#FF6600' )
  //   .add( '#000000' )
  //   .add( '#ffc84f' )
  //   .add( '#FFFFFF' )
  //   .add( '#FFFF00' )
  //   .add( '#FF00FF' );

  var FORCE = 13.5;
  var RESISTANCE = 0.4;

  //var engine = new particleEngine( 0 );
  ctx.background( 0 );

  draw = function () {

    ctx.background( 0 );

    if ( frameCount % 2 == 0 && Sound.getVol() > 40 ) {
      addParticle();
    }

    for ( var i = 0; i < engine.particles.length; i++ ) {
      var p = engine.particles[ i ];
      update( p );
      //console.log(p.pos);
      ctx.fillStyle = p.c;
      ctx.fillCircle( p.pos.x, p.pos.y, p.sz, p.sz );
      ctx.fillStyle = rgb( 0 );
      ctx.fillCircle( p.pos.x, p.pos.y, p.sz / 4, p.sz / 4 );
    }


  }


  function addParticle() {

    var spectrum = Sound.spectrum;
    var freq = getNoteFromFFT( spectrum );

    var note = getNoteFreqPerc( spectrum );
    //console.log(spectrum[note]);
    var note1 = ( freq.substring( 0, 1 ) )
      .charCodeAt( 0 ) - 65;
    num = Math.round( map( note1, 0, 7, 0, colours.pool.length ) );
    //num = Math.round(i/engine.particles.length * 360);
    //console.log(num);
    var c = colours.get( num );

    engine.add( w / 2, h / 2 );
    //console.log(engine.last);
    engine.last.resistance = RESISTANCE;
    // engine.last.sz = Math.round(Sound.getVol(1, 10));
    engine.last.sz = Math.round( map( spectrum[ note ], 0, 255, 2, 10 ) );
    engine.last.c = c;
    //engine.last.pos = new Vector( w / 2, h / 2 );
    //console.log(engine.last);
  }


  function update( p ) {

    p.acceleration.x += ( w / 2 - p.pos.x ) / ( p.sz / 2.2 );
    p.acceleration.y += ( h / 2 - p.pos.y ) / ( p.sz / 2.2 );

    p.speed.x += p.acceleration.x;
    p.speed.y += p.acceleration.y + 0.1;

    p.speed.x *= p.resistance;
    p.speed.y *= p.resistance;

    p.pos.x += p.speed.x;
    p.pos.y += p.speed.y;

    p.acceleration.x = 0;
    p.acceleration.y = 0;

    for ( var j = p.me + 1; j < engine.length; j++ ) {
      var p2 = engine.particles[ j ];
      var dx = p.pos.x - p2.pos.x;
      var dy = p.pos.y - p2.pos.y;
      var distance = dist( p.pos.x, p.pos.y, p2.pos.x, p2.pos.y );

      dx /= distance;
      dy /= distance;

      var forceX = dx * ( FORCE / distance );
      var forceY = dy * ( FORCE / distance );

      p.acceleration.x += forceX;
      p.acceleration.y += forceY;

      p2.acceleration.x -= forceX;
      p2.acceleration.y -= forceY;

    }

    console.log(p.pos);

  }

}();
