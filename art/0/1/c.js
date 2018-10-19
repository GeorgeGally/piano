rbvj = function () {

  ctx.background( 0 );
  ctx2.clearRect( 0, 0, w, h );
  var num = Math.floor( w / 40 );
  ctx.lineWidth = 0.8;
  ctx2.lineWidth = 1;
  ctx.strokeStyle = rgb( 255 );

  var grid = createGrid( num, 1 );
  var engine = new particleEngine( 8 );
  var planets = [];
  var moons = [];



  for ( var i = 0; i < engine.particles.length; i++ ) {

    p = engine.particles[ i ];
    p.speed.x = 0.001;
    p.radius = 20;
    p.start_radius = p.radius;
    p.pos.y = h / 2;
    p.counter = 360 * engine.particles.length / i;
    planets[ i ] = new particleEngine( 5 );

    for ( var j = 0; j < planets[ i ].particles.length; j++ ) {
      var b = planets[ i ].particles[ j ];
      b.speed.x = sticky( random( 100 ), 10 ) / 15000;
      //b.speed.x = 0.001;
      b.radius = 20;
      b.start_radius = b.radius;
      b.counter = randomInt( 20 );;
      moons[ j ] = new particleEngine( 2 );
      for ( var k = 0; k < moons[ j ].particles.length; k++ ) {
        var m = moons[ j ].particles[ k ];
        m.speed.x = 0.01;
        // m.radius = random(20, 90);
        m.radius = 80;
        m.sz = 80;
        m.start_radius = m.radius;
        m.counter = randomInt( 300 );
      }
    }
  }


  draw = function () {

    //ctx.background(0, 0.06);;
    ctx2.clearRect( 0, 0, w, h );
    ctx.save();

    for ( var i = 0; i < engine.particles.length; i++ ) {
      p = engine.particles[ i ];

      //p.radius = p.start_radius/2 + Math.cos(p.counter)* p.start_radius;

      if ( i == 0 ) {
        s = Sound.getHighsVol( 0, w / 4 );
      } else if ( i == 1 ) {
        s = Sound.getMidsVol( 0, w / 4 );
      } else {
        s = Sound.getBassVol( 0, w / 4 );
      }

      p.radius = tween( p.radius, w / 2 + Math.sin( p.counter ) * s, 40 );
      p.pos.x = w / 2 + Math.cos( p.counter ) * p.radius;
      ctx2.fillStyle = rgb( 255, 0, 0 );
      ctx2.fillEllipse( p.pos.x, p.pos.y, 10, 10 );
      p.counter += p.speed.x;
      ctx2.strokeStyle = rgb( 255 );
      //ctx.line(p.pos.x, p.pos.y, w/2, h/2);
      if ( i > 0 ) {
        ctx2.line( p.pos.x, p.pos.y, engine.particles[ i - 1 ].pos.x, engine.particles[ i - 1 ].pos.y );
      } else {
        ctx2.line( p.pos.x, p.pos.y, engine.particles[ engine.particles.length - 1 ].pos.x, engine.particles[ engine.particles.length - 1 ].pos.y );
      }


      for ( var j = 0; j < planets[ i ].particles.length; j++ ) {
        var b = planets[ i ].particles[ j ];

        //var s = Sound.mapSound(i, engine.particles.length, 0, 2);
        b.radius = b.start_radius / 2 + Math.cos( b.counter ) * b.start_radius;
        //b.radius = tween(b.radius, b.start_radius/2 + Math.cos(s)* b.start_radius, 20);
        b.pos.x = p.pos.x + ( Math.cos( b.counter ) * b.radius / 2 ) + b.radius / 2;
        b.pos.y = p.pos.y + ( Math.sin( b.counter ) * b.radius / 2 ) + b.radius / 2;


        drawJoints( b );

        b.counter += b.speed.x;
        for ( var k = 0; k < moons[ j ].particles.length; k++ ) {
          var m = moons[ j ].particles[ k ];

          m.radius = tween( m.radius, m.start_radius / 2 + Math.cos( m.counter ) * m.start_radius, 10 );
          m.pos.x = b.pos.x + Math.cos( m.counter ) * m.radius;
          m.pos.y = b.pos.y + Math.sin( m.counter ) * m.radius;

          ctx2.fillStyle = rgb( 255, 0, 0 );
          ctx2.fillEllipse( m.pos.x, m.pos.y, 4, 4 );

          var s = Sound.mapSound( k, moons[ j ].particles.length, 60, 80 );
          //console.log(s);
          if ( s > 0 ) m.sz = tween( m.sz, s, 20 );

          ctx.fillStyle = rgba( 255, 0.07 );
          ctx.fillEllipse( m.pos.x, m.pos.y, m.sz, m.sz );

          ctx.strokeStyle = rgba( 0, 0.4 );
          ctx.strokeCircle( m.pos.x, m.pos.y, m.sz, m.sz );
          ctx2.line( m.pos.x, m.pos.y, b.pos.x, b.pos.y );
          m.counter += m.speed.x;
        }
      }
    }



  }

  function drawJoints( b ) {
    ctx2.fillStyle = rgb( 0 );
    ctx2.fillEllipse( b.pos.x, b.pos.y, 20, 20 );
    ctx2.strokeStyle = rgb( 0 );
    ctx2.line( p.pos.x, p.pos.y, b.pos.x, b.pos.y );
  }


}();
